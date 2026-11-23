import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { restingPose, restLocal } from '@three-ws/sign-language';
import { AvatarConfig } from '../types';

/**
 * Official 3D Character Model (Ícaro)
 * Sourced directly from BLENDER_PADRAO_VLIBRAS/padrao.blend
 */
export class AvatarModel {
  public rootGroup: THREE.Group;
  public bones: Map<string, THREE.Bone> = new Map();
  public isLoaded: boolean = false;

  private restRotations: Map<string, THREE.Quaternion> = new Map();
  private materials: Map<string, THREE.Material> = new Map();

  // Face / Eyelids / Brow bones for expressions
  private leftUpperLid: THREE.Bone | null = null;
  private rightUpperLid: THREE.Bone | null = null;

  // Blinking & breathing timers
  private blinkTimer: number = 0;
  private isBlinking: boolean = false;
  private breathPhase: number = 0;

  constructor(config?: AvatarConfig) {
    this.rootGroup = new THREE.Group();
    this.rootGroup.name = 'AvatarRoot';
  }

  public async load(
    url: string = `${import.meta.env.BASE_URL || '/'}avatars/avatar.glb`.replace(/\/\//g, '/'),
    config?: AvatarConfig
  ): Promise<void> {
    const loader = new GLTFLoader();

    return new Promise((resolve, reject) => {
      loader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          model.name = 'VLibrasCharacter';

          // Traverse and collect bones, meshes, and materials
          model.traverse((child) => {
            if ((child as THREE.Bone).isBone) {
              const bone = child as THREE.Bone;
              this.bones.set(bone.name, bone);
              this.restRotations.set(bone.name, bone.quaternion.clone());

              // Facial bones identification
              if (bone.name === 'BnPalpebSuper.L') this.leftUpperLid = bone;
              if (bone.name === 'BnPalpebSuper.R') this.rightUpperLid = bone;
            }

            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;

              // Hide non-character helper meshes & accessories
              const name = mesh.name.toLowerCase();
              if (
                name.includes('oculos') ||
                name.includes('cube') ||
                name.includes('mirar') ||
                name.includes('ctrl') ||
                name === 'sphere.001'
              ) {
                mesh.visible = false;
              }

              // Store material for live color customization
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => this.materials.set(m.name, m));
              } else if (mesh.material) {
                this.materials.set(mesh.material.name, mesh.material);
              }
            }
          });

          // Scale and position:
          // Humanoid scale: 0.19 scales 7.75m raw Blender rig to ~1.47m
          // Position Y=0.04 positions hands and waist well above the bottom navigation bar
          // while leaving generous headroom for hair and clear overhead space for raised hands
          const scale = 0.19;
          model.scale.set(scale, scale, scale);
          model.position.set(0, 0.04, 0);

          this.rootGroup.add(model);
          this.isLoaded = true;

          // Apply initial colors and set signature rest pose
          if (config) {
            this.updateColors(config);
          }
          this.resetToRestPose();

          resolve();
        },
        undefined,
        (err) => reject(err)
      );
    });
  }

  /**
   * Computes the constant retargeting quaternion between Mixamo canonical shoulder frames
   * and Ícaro's bind pose shoulders. This allows arms to achieve authentic ASL world orientations
   * while keeping shoulders and shirt completely untwisted and smooth at their natural bind pose.
   */
  public getArmRetargetQuaternions(): { retargetL: THREE.Quaternion; retargetR: THREE.Quaternion } {
    const bindL = this.restRotations.get('LeftShoulder') || new THREE.Quaternion();
    const bindR = this.restRotations.get('RightShoulder') || new THREE.Quaternion();
    const qMixL = new THREE.Quaternion(...restLocal('LeftShoulder'));
    const qMixR = new THREE.Quaternion(...restLocal('RightShoulder'));
    const retargetL = bindL.clone().invert().multiply(qMixL);
    const retargetR = bindR.clone().invert().multiply(qMixR);
    return { retargetL, retargetR };
  }

  /**
   * Sets character into canonical bind rest pose:
   * All bones are safely reset to their original rest rotations.
   * Clavicles, shoulders, collar and shirt remain 100% pristine.
   */
  public resetToRestPose(): void {
    if (!this.isLoaded) return;

    this.bones.forEach((bone, name) => {
      const restQ = this.restRotations.get(name);
      if (restQ) {
        bone.quaternion.copy(restQ);
      }
    });
  }

  /**
   * Updates materials based on user customization settings
   */
  public updateColors(config: AvatarConfig): void {
    if (!this.isLoaded) return;

    // Navy Shirt
    const shirtMat = this.materials.get('defaultMat') as THREE.MeshStandardMaterial;
    if (shirtMat && 'color' in shirtMat) {
      shirtMat.color.set(config.shirtColor);
      shirtMat.roughness = 0.75;
    }

    // Pants
    const pantsMat = this.materials.get('defaultMat.001') as THREE.MeshStandardMaterial;
    if (pantsMat && 'color' in pantsMat) {
      pantsMat.color.set(config.pantsColor);
      pantsMat.roughness = 0.85;
    }

    // Hair: Stylized locks with specular highlights to reveal volume and hair strands
    const hairColor = config.hairColor || '#343238';
    this.rootGroup.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.name === 'CABELO__MAPEADO' || mesh.name.toLowerCase().includes('cabelo')) {
          if (mesh.material && !Array.isArray(mesh.material)) {
            const mat = mesh.material as THREE.MeshStandardMaterial;
            mat.color.set(hairColor);
            mat.roughness = 0.32;
            mat.metalness = 0.08;
          }
        }
      }
    });

    const hairMat = this.materials.get('CABELO') as THREE.MeshStandardMaterial;
    if (hairMat && 'color' in hairMat) {
      hairMat.color.set(hairColor);
      hairMat.roughness = 0.32;
      hairMat.metalness = 0.08;
    }

    // Skin & Hands: Maintain optimal roughness so fingernails and palm lines are sharp
    const bodyMat = this.materials.get('MatCORPO') as THREE.MeshStandardMaterial;
    if (bodyMat) {
      bodyMat.roughness = 0.48;
      bodyMat.metalness = 0.0;
    }

    const headMat = this.materials.get('CABECA') as THREE.MeshStandardMaterial;
    if (headMat) {
      headMat.roughness = 0.48;
      headMat.metalness = 0.0;
    }
  }

  /**
   * Sets facial expressions (blinking, eyebrows)
   */
  public setFacialExpression(blink: number, smile: number): void {
    if (!this.isLoaded) return;

    if (this.leftUpperLid) {
      this.leftUpperLid.rotation.x = blink * 0.35;
    }
    if (this.rightUpperLid) {
      this.rightUpperLid.rotation.x = blink * 0.35;
    }
  }

  public updateIdleAnimation(delta: number, enable: boolean = true): void {
    if (!enable) return;
    this.update(delta);
  }

  /**
   * Updates blinking and breathing cycle during playback and idle
   */
  public update(delta: number): void {
    if (!this.isLoaded) return;

    // 1. Subtle rhythmic breathing on Spine bones
    this.breathPhase += delta * 1.5;
    const breathOffset = Math.sin(this.breathPhase) * 0.008;
    const spine2 = this.bones.get('Spine2');
    if (spine2) {
      const restQ = this.restRotations.get('Spine2');
      if (restQ) {
        spine2.quaternion.copy(restQ);
        spine2.rotation.x += breathOffset * 0.05;
      }
    }

    // 2. Natural eye blinking (every 3 to 5 seconds)
    this.blinkTimer += delta;
    if (!this.isBlinking && this.blinkTimer > 3.5 + Math.random() * 2) {
      this.isBlinking = true;
      this.blinkTimer = 0;
    }

    if (this.isBlinking) {
      const blinkProgress = this.blinkTimer / 0.18; // 180ms blink
      if (blinkProgress >= 1.0) {
        this.isBlinking = false;
        this.blinkTimer = 0;
        this.setFacialExpression(0, 0);
      } else {
        const blinkAmount = Math.sin(blinkProgress * Math.PI);
        this.setFacialExpression(blinkAmount, 0);
      }
    }
  }
}
