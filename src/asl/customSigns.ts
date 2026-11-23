import * as THREE from 'three';
import { SignTimeline, posePhase, restingPose } from '@three-ws/sign-language';
import { SignDefinition, convertProceduralToPhases, NonManualMarkers } from './proceduralSignGenerator';
import { WLASL_SIGN_MAP } from './wlaslSigns';

export type { SignDefinition, NonManualMarkers };

export interface CustomSignDefinition extends SignDefinition {
  aslDesc?: string;
  vslDesc?: string;
}

export const CUSTOM_SIGNS: Record<string, CustomSignDefinition> = {
  // 1. LOVE (CROSSED ARMS EMBRACING HEART)
  LOVE: {
    gloss: 'Both S-hands cross tightly over opposite shoulders hugging heart.',
    descriptionVi: 'Hai bàn tay nắm lại hình chữ S bắt chéo ôm chặt trước ngực/tim với nụ cười ấm áp.',
    aslDesc: 'ASL: Both arms cross over chest hugging heart with S-fists.',
    vslDesc: 'VSL: Hai tay chéo ôm trước ngực thể hiện tình yêu thương chân thành.',
    phases: [
      { t: 0.38, right: { shape: 'S', at: { anchor: 'shoulder', out: -0.30, up: -0.02, forward: 0.16 }, fingers: ['up', 'in'], palm: 'back' }, left: { shape: 'S', at: { anchor: 'shoulder', out: -0.30, up: -0.07, forward: 0.11 }, fingers: ['up', 'in'], palm: 'back' }, head: { tilt: 4, nod: 2 } },
      { t: 0.18, right: { shape: 'S', at: { anchor: 'shoulder', out: -0.30, up: -0.02, forward: 0.15 }, fingers: ['up', 'in'], palm: 'back' }, left: { shape: 'S', at: { anchor: 'shoulder', out: -0.30, up: -0.07, forward: 0.10 }, fingers: ['up', 'in'], palm: 'back' }, hold: 0.35 }
    ]
  },

  I_LOVE_YOU: {
    gloss: 'ILY handshape extends forward with warm smile.',
    descriptionVi: 'Bàn tay tạo hình ILY chuẩn quốc tế (ngón cái, trỏ và út giơ lên) đưa nhẹ về phía trước.',
    aslDesc: 'ASL: Universal ILY handshape (thumb, index, pinky) extending outward.',
    vslDesc: 'VSL: Biểu tượng ngón tay ILY quốc tế giơ cao hướng về đối phương.',
    phases: [
      { t: 0.35, right: { shape: 'ILY', at: { anchor: 'chest', out: 0.14, up: 0.04, forward: 0.22 }, fingers: 'up', palm: 'forward' }, head: { tilt: 3 } },
      { t: 0.25, right: { shape: 'ILY', at: { anchor: 'chest', out: 0.14, up: 0.04, forward: 0.28 }, fingers: 'up', palm: 'forward' }, hold: 0.25 }
    ]
  },

  // 2. GREETINGS & SOCIAL
  HELLO: {
    gloss: 'Open flat hand salutes outward from temple.',
    descriptionVi: 'Bàn tay mở chạm cạnh ngón trỏ vào thái dương rồi đưa ra phía trước chào trang trọng.',
    aslDesc: 'ASL: Open hand salutes from temple outward.',
    vslDesc: 'VSL: Bàn tay mở trước trán/thái dương vẫy nhẹ chào.',
    phases: [
      { t: 0.3, right: { shape: 'FLAT', at: { anchor: 'forehead', out: 0.15, up: 0.03, forward: 0.18 }, fingers: 'up', palm: 'forward' } },
      { t: 0.32, right: { shape: 'FLAT', at: { anchor: 'forehead', out: 0.24, up: 0.03, forward: 0.28 }, fingers: 'up', palm: 'forward' }, hold: 0.2 }
    ]
  },

  GOODBYE: {
    gloss: 'Open hand waves fingers in farewell.',
    descriptionVi: 'Bàn tay mở giơ cao vẫy nhẹ các ngón tay chào tạm biệt.',
    aslDesc: 'ASL: Open hand raised waving outward.',
    vslDesc: 'VSL: Vẫy cả bàn tay chào tạm biệt.',
    phases: [
      { t: 0.25, right: { shape: 'FLAT', at: { anchor: 'forehead', out: 0.22, up: 0.08, forward: 0.22 }, fingers: 'up', palm: 'forward' } },
      { t: 0.2, right: { shape: 'BENT_B', at: { anchor: 'forehead', out: 0.22, up: 0.08, forward: 0.22 }, fingers: 'forward', palm: 'forward' } },
      { t: 0.2, right: { shape: 'FLAT', at: { anchor: 'forehead', out: 0.22, up: 0.08, forward: 0.22 }, fingers: 'up', palm: 'forward' }, hold: 0.2 }
    ]
  },

  THANK_YOU: {
    gloss: 'Flat hand touches chin/lips then extends downward and forward.',
    descriptionVi: 'Đầu các ngón tay phẳng chạm nhẹ vào cằm/môi rồi đưa xuống và hướng về đối phương thể hiện lòng biết ơn.',
    aslDesc: 'ASL: Fingers touch chin/lips and move forward toward the receiver.',
    vslDesc: 'VSL: Bàn tay từ cằm/ngực đưa ra phía trước với nụ cười gật đầu cảm ơn.',
    phases: [
      { t: 0.3, right: { shape: 'FLAT', at: { anchor: 'chin', out: 0.04, up: 0.02, forward: 0.13 }, fingers: 'up', palm: 'in' }, head: { nod: 2 } },
      { t: 0.35, right: { shape: 'FLAT', at: { anchor: 'chest', out: 0.08, up: -0.04, forward: 0.32 }, fingers: 'forward', palm: 'up' }, head: { nod: 4 }, hold: 0.25 }
    ]
  },

  PLEASE: {
    gloss: 'Flat hand rubs in circular motion over sternum.',
    descriptionVi: 'Bàn tay mở phẳng áp vào giữa ngực xoa tròn nhẹ nhàng thể hiện sự lịch sự, làm ơn.',
    aslDesc: 'ASL: Open hand rubs circular on chest.',
    vslDesc: 'VSL: Bàn tay phẳng xoa tròn trước ngực xin phép, làm ơn.',
    phases: [
      { t: 0.2, right: { shape: 'FLAT', at: { anchor: 'sternum', out: 0.02, up: 0.06, forward: 0.14 }, fingers: 'up', palm: 'back' } },
      { t: 0.18, right: { shape: 'FLAT', at: { anchor: 'sternum', out: 0.08, up: 0.00, forward: 0.14 }, fingers: 'up', palm: 'back' } },
      { t: 0.18, right: { shape: 'FLAT', at: { anchor: 'sternum', out: 0.02, up: -0.06, forward: 0.14 }, fingers: 'up', palm: 'back' } },
      { t: 0.18, right: { shape: 'FLAT', at: { anchor: 'sternum', out: -0.04, up: 0.00, forward: 0.14 }, fingers: 'up', palm: 'back' } },
      { t: 0.2, right: { shape: 'FLAT', at: { anchor: 'sternum', out: 0.02, up: 0.06, forward: 0.14 }, fingers: 'up', palm: 'back' }, hold: 0.2 }
    ]
  },

  SORRY: {
    gloss: 'A-fist rubs circular over heart with apologetic expression.',
    descriptionVi: 'Bàn tay nắm đấm hình chữ A xoa tròn trên ngực trái (vị trí tim) kết hợp vẻ mặt chân thành xin lỗi.',
    aslDesc: 'ASL: A-fist circles over chest/heart with remorseful facial marker.',
    vslDesc: 'VSL: Nắm tay xoa tròn trước ngực kết hợp cúi nhẹ đầu xin lỗi.',
    phases: [
      { t: 0.22, right: { shape: 'A', at: { anchor: 'chest', out: 0.05, up: 0.05, forward: 0.14 }, fingers: 'up', palm: 'back' }, head: { tilt: 3 } },
      { t: 0.18, right: { shape: 'A', at: { anchor: 'chest', out: 0.09, up: 0.00, forward: 0.14 }, fingers: 'up', palm: 'back' } },
      { t: 0.18, right: { shape: 'A', at: { anchor: 'chest', out: 0.05, up: -0.05, forward: 0.14 }, fingers: 'up', palm: 'back' } },
      { t: 0.18, right: { shape: 'A', at: { anchor: 'chest', out: 0.01, up: 0.00, forward: 0.14 }, fingers: 'up', palm: 'back' } },
      { t: 0.2, right: { shape: 'A', at: { anchor: 'chest', out: 0.05, up: 0.05, forward: 0.14 }, fingers: 'up', palm: 'back' }, hold: 0.2 }
    ]
  },

  YES: {
    gloss: 'S-fist nods up and down like a nodding head.',
    descriptionVi: 'Bàn tay nắm đấm hình chữ S gật lên gật xuống từ cổ tay như cái đầu gật đồng ý.',
    aslDesc: 'ASL: S-hand nods up and down mimicking head nod.',
    vslDesc: 'VSL: Nắm tay gật lên xuống dứt khoát xác nhận có / đúng.',
    phases: [
      { t: 0.25, right: { shape: 'S', at: { anchor: 'chest', out: 0.16, up: 0.04, forward: 0.22 }, fingers: 'up', palm: 'forward' }, head: { nod: 3 } },
      { t: 0.18, right: { shape: 'S', at: { anchor: 'chest', out: 0.16, up: -0.05, forward: 0.24 }, fingers: 'forward', palm: 'down' }, head: { nod: 5 } },
      { t: 0.18, right: { shape: 'S', at: { anchor: 'chest', out: 0.16, up: 0.04, forward: 0.22 }, fingers: 'up', palm: 'forward' }, head: { nod: 3 } },
      { t: 0.18, right: { shape: 'S', at: { anchor: 'chest', out: 0.16, up: -0.05, forward: 0.24 }, fingers: 'forward', palm: 'down' }, head: { nod: 5 }, hold: 0.2 }
    ]
  },

  NO: {
    gloss: 'Index and middle fingers snap shut to meet thumb.',
    descriptionVi: 'Ngón trỏ và ngón giữa duỗi ra cùng ngón cái rồi chụm đập mạnh vào nhau báo hiệu không.',
    aslDesc: 'ASL: Index and middle fingers snap closed to thumb with headshake.',
    vslDesc: 'VSL: Hai ngón tay chụm lại dứt khoát kết hợp lắc đầu không.',
    phases: [
      { t: 0.25, right: { shape: 'U', at: { anchor: 'chest', out: 0.14, up: 0.04, forward: 0.24 }, fingers: 'forward', palm: 'in' }, head: { turn: 4 } },
      { t: 0.18, right: { shape: 'FLAT_O', at: { anchor: 'chest', out: 0.14, up: 0.02, forward: 0.24 }, fingers: 'forward', palm: 'in' }, head: { turn: -4 } },
      { t: 0.18, right: { shape: 'U', at: { anchor: 'chest', out: 0.14, up: 0.04, forward: 0.24 }, fingers: 'forward', palm: 'in' }, head: { turn: 4 } },
      { t: 0.18, right: { shape: 'FLAT_O', at: { anchor: 'chest', out: 0.14, up: 0.02, forward: 0.24 }, fingers: 'forward', palm: 'in' }, head: { turn: -4 }, hold: 0.2 }
    ]
  },

  // 3. ESSENTIAL VERBS & ACTIONS
  WATER: {
    gloss: 'W-handshape taps chin twice.',
    descriptionVi: 'Bàn tay tạo hình chữ W (ngón trỏ, giữa, áp út giơ thẳng) chạm nhẹ ngón trỏ vào cằm 2 lần.',
    aslDesc: 'ASL: W-handshape index taps chin twice.',
    vslDesc: 'VSL: Ngón tay chữ W hoặc ngón trỏ chạm cằm hai lần biểu thị nước.',
    phases: [
      { t: 0.3, right: { shape: 'W', at: { anchor: 'chin', out: 0.07, up: 0, forward: 0.12 }, fingers: 'up', palm: 'in' } },
      { t: 0.16, right: { shape: 'W', at: { anchor: 'chin', out: 0.07, up: 0, forward: 0.16 }, fingers: 'up', palm: 'in' } },
      { t: 0.16, right: { shape: 'W', at: { anchor: 'chin', out: 0.07, up: 0, forward: 0.12 }, fingers: 'up', palm: 'in' } },
      { t: 0.16, right: { shape: 'W', at: { anchor: 'chin', out: 0.07, up: 0, forward: 0.16 }, fingers: 'up', palm: 'in' }, hold: 0.2 }
    ]
  },

  EAT: {
    gloss: 'Flattened O fingertips tap lips/mouth twice.',
    descriptionVi: 'Các đầu ngón tay chụm lại hình chữ O dẹt gõ nhẹ vào miệng hai lần mô phỏng động tác đưa thức ăn vào miệng.',
    aslDesc: 'ASL: Flattened O handshape taps lips twice.',
    vslDesc: 'VSL: Bàn tay chụm ngón tay đưa nhẹ vào miệng hai lần biểu thị ăn cơm, thức ăn.',
    phases: [
      { t: 0.3, right: { shape: 'FLAT_O', at: { anchor: 'mouth', out: 0.04, forward: 0.11 }, fingers: 'up', palm: 'in' } },
      { t: 0.16, right: { shape: 'FLAT_O', at: { anchor: 'mouth', out: 0.04, forward: 0.16 }, fingers: 'up', palm: 'in' } },
      { t: 0.16, right: { shape: 'FLAT_O', at: { anchor: 'mouth', out: 0.04, forward: 0.11 }, fingers: 'up', palm: 'in' } },
      { t: 0.16, right: { shape: 'FLAT_O', at: { anchor: 'mouth', out: 0.04, forward: 0.16 }, fingers: 'up', palm: 'in' }, hold: 0.2 }
    ]
  },

  DRINK: {
    gloss: 'C-handshape tilts upward toward mouth as if drinking.',
    descriptionVi: 'Bàn tay khum hình chữ C như đang cầm cốc nước nghiêng nhẹ đưa lên miệng.',
    aslDesc: 'ASL: C-hand tilts toward mouth as if holding a cup.',
    vslDesc: 'VSL: Bàn tay khum chữ C nghiêng vào miệng mô phỏng uống nước.',
    phases: [
      { t: 0.3, right: { shape: 'C', at: { anchor: 'mouth', out: 0.06, forward: 0.17 }, fingers: 'up', palm: 'in' } },
      { t: 0.35, right: { shape: 'C', at: { anchor: 'mouth', out: 0.04, forward: 0.12 }, fingers: ['up', 'in'], palm: ['in', 'up'] }, head: { nod: -3 }, hold: 0.25 }
    ]
  },

  WANT: {
    gloss: 'Both claw hands pull inward toward chest.',
    descriptionVi: 'Hai bàn tay mở các ngón hơi co nhẹ (hình móng vuốt) ngửa lên rồi kéo về phía ngực.',
    aslDesc: 'ASL: Both clawed hands palms-up pull inward toward torso.',
    vslDesc: 'VSL: Hai tay ngửa co nhẹ kéo về ngực biểu thị mong muốn.',
    phases: [
      { t: 0.3, both: { shape: 'CLAW', at: { anchor: 'chest', out: 0.16, up: -0.04, forward: 0.30 }, fingers: 'forward', palm: 'up' }, head: { nod: 2 } },
      { t: 0.3, both: { shape: 'CLAW', at: { anchor: 'chest', out: 0.14, up: -0.02, forward: 0.16 }, fingers: 'forward', palm: 'up' }, head: { nod: 4 }, hold: 0.25 }
    ]
  },

  HELP: {
    gloss: 'A-fist resting on flat palm lifts upward together.',
    descriptionVi: 'Bàn tay trái mở phẳng ngửa lên, tay phải nắm đấm chữ A đặt lên lòng bàn tay trái và cùng nâng lên.',
    aslDesc: 'ASL: Right fist on left flat palm lifts upward together.',
    vslDesc: 'VSL: Một tay phẳng đỡ dưới nắm tay nâng lên biểu thị giúp đỡ.',
    phases: [
      { t: 0.3, left: { shape: 'FLAT', at: { anchor: 'chest', out: 0.06, up: -0.06, forward: 0.22 }, fingers: 'forward', palm: 'up' }, right: { shape: 'A', at: { anchor: 'chest', out: 0.06, up: 0.01, forward: 0.22 }, fingers: 'up', palm: 'in' } },
      { t: 0.35, left: { shape: 'FLAT', at: { anchor: 'chest', out: 0.06, up: 0.08, forward: 0.25 }, fingers: 'forward', palm: 'up' }, right: { shape: 'A', at: { anchor: 'chest', out: 0.06, up: 0.15, forward: 0.25 }, fingers: 'up', palm: 'in' }, hold: 0.25 }
    ]
  },

  STOP: {
    gloss: 'Right flat hand chops down onto flat left palm.',
    descriptionVi: 'Tay trái mở phẳng ngửa lên, tay phải mở phẳng chặt dứt khoát thẳng đứng xuống lòng bàn tay trái.',
    aslDesc: 'ASL: Right flat hand chops firmly down into left open palm.',
    vslDesc: 'VSL: Tay phải chặt dứt khoát xuống lòng bàn tay trái báo hiệu dừng lại.',
    phases: [
      { t: 0.28, left: { shape: 'FLAT', at: { anchor: 'chest', out: 0.06, up: -0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' }, right: { shape: 'FLAT', at: { anchor: 'chest', out: 0.06, up: 0.16, forward: 0.24 }, fingers: ['forward', 'down'], palm: 'in' } },
      { t: 0.2, left: { shape: 'FLAT', at: { anchor: 'chest', out: 0.06, up: -0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' }, right: { shape: 'FLAT', at: { anchor: 'chest', out: 0.06, up: -0.02, forward: 0.24 }, fingers: ['forward', 'down'], palm: 'in' }, hold: 0.3 }
    ]
  },

  NICE: {
    gloss: 'Right flat palm slides horizontally across flat left palm.',
    descriptionVi: 'Tay trái mở phẳng ngửa lên, tay phải mở phẳng úp xuống trượt ngang nhẹ nhàng trên lòng bàn tay trái.',
    aslDesc: 'ASL: Right open palm slides across flat left palm.',
    vslDesc: 'VSL: Bàn tay phải trượt nhẹ trên lòng bàn tay trái biểu thị tốt đẹp, tuyệt vời.',
    phases: [
      { t: 0.3, left: { shape: 'FLAT', at: { anchor: 'chest', out: 0.06, up: -0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' }, right: { shape: 'FLAT', at: { anchor: 'chest', out: 0.06, up: 0.01, forward: 0.18 }, fingers: 'forward', palm: 'down' } },
      { t: 0.35, left: { shape: 'FLAT', at: { anchor: 'chest', out: 0.06, up: -0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' }, right: { shape: 'FLAT', at: { anchor: 'chest', out: 0.06, up: 0.01, forward: 0.32 }, fingers: 'forward', palm: 'down' }, hold: 0.2 }
    ]
  },

  MEET: {
    gloss: 'Both 1-hands move toward each other until index knuckles meet.',
    descriptionVi: 'Hai ngón trỏ giơ thẳng hướng lên di chuyển từ hai bên lại gần nhau cho đến khi chạm nhau.',
    aslDesc: 'ASL: Both index fingers approach and meet in front of chest.',
    vslDesc: 'VSL: Hai ngón trỏ hoặc hai bàn tay chụm lại gặp nhau trước ngực.',
    phases: [
      { t: 0.3, right: { shape: '1', at: { anchor: 'chest', out: 0.18, up: 0.02, forward: 0.24 }, fingers: 'up', palm: 'in' }, left: { shape: '1', at: { anchor: 'chest', out: 0.18, up: 0.02, forward: 0.24 }, fingers: 'up', palm: 'in' } },
      { t: 0.35, right: { shape: '1', at: { anchor: 'chest', out: 0.04, up: 0.02, forward: 0.24 }, fingers: 'up', palm: 'in' }, left: { shape: '1', at: { anchor: 'chest', out: 0.04, up: 0.02, forward: 0.24 }, fingers: 'up', palm: 'in' }, hold: 0.25 }
    ]
  },

  NAME: {
    gloss: 'Both H-hands tap across each other twice.',
    descriptionVi: 'Hai bàn tay chữ H (ngón trỏ và ngón giữa duỗi thẳng) bắt chéo gõ nhẹ lên nhau hai lần.',
    aslDesc: 'ASL: Both H-hands tap together across fingers twice.',
    vslDesc: 'VSL: Ngón cái và trỏ chạm nhau gõ nhẹ trước ngực biểu thị tên.',
    phases: [
      { t: 0.3, left: { shape: 'H', at: { anchor: 'chest', out: 0.06, up: 0.02, forward: 0.24 }, fingers: ['forward', 'in'], palm: 'down' }, right: { shape: 'H', at: { anchor: 'chest', out: 0.06, up: 0.08, forward: 0.24 }, fingers: ['forward', 'in'], palm: 'down' } },
      { t: 0.16, left: { shape: 'H', at: { anchor: 'chest', out: 0.06, up: 0.02, forward: 0.24 }, fingers: ['forward', 'in'], palm: 'down' }, right: { shape: 'H', at: { anchor: 'chest', out: 0.06, up: 0.03, forward: 0.24 }, fingers: ['forward', 'in'], palm: 'down' } },
      { t: 0.16, left: { shape: 'H', at: { anchor: 'chest', out: 0.06, up: 0.02, forward: 0.24 }, fingers: ['forward', 'in'], palm: 'down' }, right: { shape: 'H', at: { anchor: 'chest', out: 0.06, up: 0.08, forward: 0.24 }, fingers: ['forward', 'in'], palm: 'down' } },
      { t: 0.16, left: { shape: 'H', at: { anchor: 'chest', out: 0.06, up: 0.02, forward: 0.24 }, fingers: ['forward', 'in'], palm: 'down' }, right: { shape: 'H', at: { anchor: 'chest', out: 0.06, up: 0.03, forward: 0.24 }, fingers: ['forward', 'in'], palm: 'down' }, hold: 0.2 }
    ]
  },

  // 4. QUESTIONS & GRAMMAR
  WHAT: {
    gloss: 'Both 5-hands open palms facing up shake side-to-side.',
    descriptionVi: 'Hai bàn tay mở ngửa hướng lên lắc nhẹ sang hai bên kết hợp nhíu mày hỏi cái gì.',
    aslDesc: 'ASL: Open palms up shake side-to-side with furrowed eyebrows.',
    vslDesc: 'VSL: Hai bàn tay ngửa lắc nhẹ hỏi cái gì / việc gì.',
    phases: [
      { t: 0.25, both: { shape: '5', at: { anchor: 'belly', out: 0.16, up: 0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' }, head: { tilt: 3 } },
      { t: 0.2, both: { shape: '5', at: { anchor: 'belly', out: 0.24, up: 0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' }, head: { tilt: -3 } },
      { t: 0.2, both: { shape: '5', at: { anchor: 'belly', out: 0.16, up: 0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' }, head: { tilt: 3 } },
      { t: 0.2, both: { shape: '5', at: { anchor: 'belly', out: 0.24, up: 0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' }, head: { tilt: -3 }, hold: 0.2 }
    ]
  },

  HOW: {
    gloss: 'Both curved hands roll outward so palms face up.',
    descriptionVi: 'Hai bàn tay khum úp vào nhau rồi xoay lật ngửa lên trước ngực hỏi thế nào, làm sao.',
    aslDesc: 'ASL: Both curved hands roll outward to palms up.',
    vslDesc: 'VSL: Hai bàn tay lật ngửa trước ngực hỏi làm sao / thế nào.',
    phases: [
      { t: 0.3, both: { shape: 'C', at: { anchor: 'belly', out: 0.10, up: 0.04, forward: 0.22 }, fingers: 'forward', palm: 'down' } },
      { t: 0.35, both: { shape: 'C', at: { anchor: 'belly', out: 0.16, up: 0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' }, head: { tilt: 3 }, hold: 0.25 }
    ]
  },

  TODAY: {
    gloss: 'Both Y-hands bounce downward twice at waist.',
    descriptionVi: 'Hai bàn tay tạo hình chữ Y (ngón cái và ngón út giơ ra) nhún nảy xuống hai lần biểu thị hôm nay.',
    aslDesc: 'ASL: Both Y-hands drop downward twice at waist height.',
    vslDesc: 'VSL: Hai bàn tay chữ Y nhún xuống hai lần biểu thị hôm nay.',
    phases: [
      { t: 0.25, both: { shape: 'Y', at: { anchor: 'belly', out: 0.18, up: 0.06, forward: 0.24 }, fingers: 'forward', palm: 'up' } },
      { t: 0.18, both: { shape: 'Y', at: { anchor: 'belly', out: 0.18, up: -0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' } },
      { t: 0.18, both: { shape: 'Y', at: { anchor: 'belly', out: 0.18, up: 0.06, forward: 0.24 }, fingers: 'forward', palm: 'up' } },
      { t: 0.18, both: { shape: 'Y', at: { anchor: 'belly', out: 0.18, up: -0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' }, hold: 0.2 }
    ]
  },

  FRIDAY: {
    gloss: 'F-handshape circles clockwise near temple.',
    descriptionVi: 'Bàn tay phải tạo hình chữ F (ngón cái và ngón trỏ chụm vòng tròn) xoay tròn nhẹ gần thái dương.',
    aslDesc: 'ASL: F-handshape circles near temple/ear.',
    vslDesc: 'VSL: Bàn tay chữ F hoặc biểu thị ngày thứ sáu vui vẻ.',
    phases: [
      { t: 0.25, right: { shape: 'F', at: { anchor: 'forehead', out: 0.20, up: 0.04, forward: 0.22 }, fingers: 'up', palm: 'forward' } },
      { t: 0.2, right: { shape: 'F', at: { anchor: 'forehead', out: 0.24, up: 0.00, forward: 0.22 }, fingers: 'up', palm: 'forward' } },
      { t: 0.2, right: { shape: 'F', at: { anchor: 'forehead', out: 0.20, up: -0.04, forward: 0.22 }, fingers: 'up', palm: 'forward' } },
      { t: 0.2, right: { shape: 'F', at: { anchor: 'forehead', out: 0.16, up: 0.00, forward: 0.22 }, fingers: 'up', palm: 'forward' } },
      { t: 0.2, right: { shape: 'F', at: { anchor: 'forehead', out: 0.20, up: 0.04, forward: 0.22 }, fingers: 'up', palm: 'forward' }, hold: 0.2 }
    ]
  },

  HAPPY: {
    gloss: 'Both open flat hands brush upward on chest twice.',
    descriptionVi: 'Hai bàn tay mở phẳng vuốt nhẹ hướng lên trên ngực hai lần kết hợp nụ cười rạng rỡ.',
    aslDesc: 'ASL: Both flat hands brush upward on chest twice.',
    vslDesc: 'VSL: Hai bàn tay vuốt nhẹ lên ngực hai lần biểu thị sự vui vẻ hạnh phúc.',
    phases: [
      { t: 0.25, both: { shape: 'FLAT', at: { anchor: 'chest', out: 0.1, up: -0.05, forward: 0.15 }, fingers: 'up', palm: 'back' } },
      { t: 0.2, both: { shape: 'FLAT', at: { anchor: 'chest', out: 0.1, up: 0.05, forward: 0.15 }, fingers: 'up', palm: 'back' } },
      { t: 0.15, both: { shape: 'FLAT', at: { anchor: 'chest', out: 0.1, up: -0.05, forward: 0.15 }, fingers: 'up', palm: 'back' } },
      { t: 0.2, both: { shape: 'FLAT', at: { anchor: 'chest', out: 0.1, up: 0.05, forward: 0.15 }, fingers: 'up', palm: 'back' }, hold: 0.2 }
    ]
  },

  VIETNAM: {
    gloss: 'V-handshape traces an S-curve down torso.',
    descriptionVi: 'Bàn tay phải hình chữ V vẽ đường cong hình chữ S mềm mại từ vai phải xuống hông trái biểu thị dải đất hình chữ S Việt Nam.',
    aslDesc: 'ASL: V-hand traces S-curve down the torso.',
    vslDesc: 'VSL: Bàn tay vẽ đường cong hình chữ S Việt Nam biểu tượng đất nước.',
    phases: [
      { t: 0.25, right: { shape: 'V', at: { anchor: 'chest', out: 0.16, up: 0.12, forward: 0.22 }, fingers: 'up', palm: 'forward' } },
      { t: 0.2, right: { shape: 'V', at: { anchor: 'chest', out: 0.02, up: 0.04, forward: 0.22 }, fingers: 'up', palm: 'forward' } },
      { t: 0.2, right: { shape: 'V', at: { anchor: 'belly', out: 0.14, up: -0.04, forward: 0.22 }, fingers: 'up', palm: 'forward' } },
      { t: 0.25, right: { shape: 'V', at: { anchor: 'belly', out: 0.04, up: -0.12, forward: 0.22 }, fingers: 'up', palm: 'forward' }, hold: 0.25 }
    ]
  },

  // 5. EXTENDED OBJECTS & RELATIONSHIPS
  BOOK: {
    gloss: 'Both flat hands touch palms then open outward like a book.',
    descriptionVi: 'Hai lòng bàn tay chạm nhau rồi mở các ngón cái sang hai bên như mở một cuốn sách.',
    aslDesc: 'ASL: Palms touch and open outward like a book.',
    vslDesc: 'VSL: Hai bàn tay chạm nhau rồi mở rộng mô phỏng mở quyển sách.',
    phases: [
      { t: 0.3, both: { shape: 'FLAT', at: { anchor: 'chest', out: 0.04, up: 0.02, forward: 0.24 }, fingers: 'forward', palm: 'in' } },
      { t: 0.35, both: { shape: 'FLAT', at: { anchor: 'chest', out: 0.14, up: 0.02, forward: 0.24 }, fingers: 'forward', palm: 'up' }, hold: 0.25 }
    ]
  },

  HOUSE: {
    gloss: 'Fingertips touch forming peaked roof then walls.',
    descriptionVi: 'Đầu các ngón tay hai bên chạm nhau tạo thành mái nhà nhọn rồi trượt xuống làm vách nhà.',
    aslDesc: 'ASL: Fingertips touch forming roof and move down for walls.',
    vslDesc: 'VSL: Hai tay chụm tạo hình mái nhà biểu thị ngôi nhà.',
    phases: [
      { t: 0.3, both: { shape: 'FLAT', at: { anchor: 'chest', out: 0.06, up: 0.14, forward: 0.24 }, fingers: ['up', 'in'], palm: ['down', 'in'] } },
      { t: 0.35, both: { shape: 'FLAT', at: { anchor: 'chest', out: 0.14, up: -0.02, forward: 0.24 }, fingers: 'down', palm: 'in' }, hold: 0.25 }
    ]
  },

  TIME: {
    gloss: 'Right index taps left wrist watch position twice.',
    descriptionVi: 'Tay trái để ngang ngực như đang đeo đồng hồ, ngón trỏ tay phải gõ nhẹ lên cổ tay trái 2 lần.',
    aslDesc: 'ASL: Right index finger taps left wrist twice.',
    vslDesc: 'VSL: Ngón trỏ gõ vào cổ tay trái vị trí đồng hồ biểu thị thời gian.',
    phases: [
      { t: 0.3, left: { shape: 'S', at: { anchor: 'belly', out: 0.08, up: 0.02, forward: 0.24 }, fingers: ['forward', 'in'], palm: 'down' }, right: { shape: '1', at: { anchor: 'belly', out: 0.08, up: 0.08, forward: 0.24 }, fingers: ['forward', 'down'], palm: 'in' } },
      { t: 0.16, left: { shape: 'S', at: { anchor: 'belly', out: 0.08, up: 0.02, forward: 0.24 }, fingers: ['forward', 'in'], palm: 'down' }, right: { shape: '1', at: { anchor: 'belly', out: 0.08, up: 0.03, forward: 0.24 }, fingers: ['forward', 'down'], palm: 'in' } },
      { t: 0.16, left: { shape: 'S', at: { anchor: 'belly', out: 0.08, up: 0.02, forward: 0.24 }, fingers: ['forward', 'in'], palm: 'down' }, right: { shape: '1', at: { anchor: 'belly', out: 0.08, up: 0.08, forward: 0.24 }, fingers: ['forward', 'down'], palm: 'in' } },
      { t: 0.16, left: { shape: 'S', at: { anchor: 'belly', out: 0.08, up: 0.02, forward: 0.24 }, fingers: ['forward', 'in'], palm: 'down' }, right: { shape: '1', at: { anchor: 'belly', out: 0.08, up: 0.03, forward: 0.24 }, fingers: ['forward', 'down'], palm: 'in' }, hold: 0.2 }
    ]
  },

  FAMILY: {
    gloss: 'Both F-hands circle outward and touch pinkies.',
    descriptionVi: 'Hai bàn tay chữ F chụm ngón cái và trỏ lại với nhau rồi vẽ vòng cung ra hai bên đến khi ngón út chạm nhau.',
    aslDesc: 'ASL: Both F-hands circle and touch pinkies together.',
    vslDesc: 'VSL: Hai tay chữ F vòng tròn bao quanh biểu thị gia đình sum họp.',
    phases: [
      { t: 0.28, both: { shape: 'F', at: { anchor: 'chest', out: 0.06, up: 0.04, forward: 0.24 }, fingers: 'up', palm: 'forward' } },
      { t: 0.24, both: { shape: 'F', at: { anchor: 'chest', out: 0.18, up: 0.04, forward: 0.28 }, fingers: 'up', palm: 'in' } },
      { t: 0.28, both: { shape: 'F', at: { anchor: 'chest', out: 0.06, up: 0.04, forward: 0.22 }, fingers: 'up', palm: 'back' }, hold: 0.2 }
    ]
  },

  LEARN: {
    gloss: 'Right hand gathers knowledge from flat left palm to forehead.',
    descriptionVi: 'Tay trái mở ngửa như cuốn sách, tay phải chụm các ngón tay như nhặt kiến thức từ bàn tay trái đặt lên trán.',
    aslDesc: 'ASL: Right hand takes knowledge from left palm and places on forehead.',
    vslDesc: 'VSL: Tay phải bốc kiến thức từ lòng bàn tay trái đưa lên thái dương biểu thị học.',
    phases: [
      { t: 0.3, left: { shape: 'FLAT', at: { anchor: 'chest', out: 0.08, up: -0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' }, right: { shape: 'FLAT_O', at: { anchor: 'chest', out: 0.08, up: 0.02, forward: 0.24 }, fingers: 'down', palm: 'down' } },
      { t: 0.35, left: { shape: 'FLAT', at: { anchor: 'chest', out: 0.08, up: -0.04, forward: 0.24 }, fingers: 'forward', palm: 'up' }, right: { shape: 'FLAT_O', at: { anchor: 'forehead', out: 0.06, up: 0.02, forward: 0.14 }, fingers: 'in', palm: 'in' }, head: { nod: 2 }, hold: 0.25 }
    ]
  },

  SIGN_LANGUAGE: {
    gloss: 'Both 1-hands alternate rotating circles in signing space.',
    descriptionVi: 'Hai ngón trỏ giơ thẳng luân phiên xoay tròn nhịp nhàng phía trước ngực mô phỏng ngôn ngữ ký hiệu.',
    aslDesc: 'ASL: Both index fingers alternate rotating circles.',
    vslDesc: 'VSL: Hai ngón trỏ xoay tròn nhịp nhàng trước ngực biểu thị ngôn ngữ ký hiệu.',
    phases: [
      { t: 0.25, right: { shape: '1', at: { anchor: 'chest', out: 0.14, up: 0.06, forward: 0.24 }, fingers: 'up', palm: 'in' }, left: { shape: '1', at: { anchor: 'chest', out: 0.14, up: -0.04, forward: 0.24 }, fingers: 'up', palm: 'in' } },
      { t: 0.25, right: { shape: '1', at: { anchor: 'chest', out: 0.14, up: -0.04, forward: 0.24 }, fingers: 'up', palm: 'in' }, left: { shape: '1', at: { anchor: 'chest', out: 0.14, up: 0.06, forward: 0.24 }, fingers: 'up', palm: 'in' } },
      { t: 0.25, right: { shape: '1', at: { anchor: 'chest', out: 0.14, up: 0.06, forward: 0.24 }, fingers: 'up', palm: 'in' }, left: { shape: '1', at: { anchor: 'chest', out: 0.14, up: -0.04, forward: 0.24 }, fingers: 'up', palm: 'in' }, hold: 0.2 }
    ]
  }
};

// Bridge all WLASL 150 Core Signs into CUSTOM_SIGNS for full coverage
for (const [key, wlaslDef] of Object.entries(WLASL_SIGN_MAP)) {
  if (!CUSTOM_SIGNS[key]) {
    CUSTOM_SIGNS[key] = {
      gloss: wlaslDef.gloss || key,
      duration: wlaslDef.duration || 1100,
      nmm: wlaslDef.nmm || { smile: 0.4, eyebrows: 'neutral' },
      descriptionVi: wlaslDef.descriptionVi,
      aslDesc: `ASL: ${wlaslDef.gloss} (${wlaslDef.config.handshape} at ${wlaslDef.config.location})`,
      vslDesc: `VSL: ${wlaslDef.meaningVi}`,
      phases: convertProceduralToPhases(
        wlaslDef.config,
        wlaslDef.config.location,
        wlaslDef.config.motion,
        wlaslDef.config.twoHanded,
        wlaslDef.nmm
      )
    };
  }
}

// Ensure all manual CUSTOM_SIGNS have duration and non-manual markers populated
for (const [key, sign] of Object.entries(CUSTOM_SIGNS)) {
  const w = WLASL_SIGN_MAP[key];
  if (!sign.duration) sign.duration = w?.duration || 1100;
  if (!sign.nmm) sign.nmm = w?.nmm || { smile: 0.4, eyebrows: 'neutral' };
  if (w && (!sign.phases || sign.phases.length < 3)) {
    sign.phases = convertProceduralToPhases(
      w.config,
      w.config.location,
      w.config.motion,
      w.config.twoHanded,
      w.nmm
    );
  }
}

export const CUSTOM_SIGN_WORDS = Object.keys(CUSTOM_SIGNS);

export function isCustomSign(word: string): boolean {
  if (!word) return false;
  const clean = word.trim().toUpperCase().replace(/[\s-]/g, '_');
  return Object.prototype.hasOwnProperty.call(CUSTOM_SIGNS, clean) ||
         Object.prototype.hasOwnProperty.call(CUSTOM_SIGNS, word.toUpperCase()) ||
         Object.prototype.hasOwnProperty.call(WLASL_SIGN_MAP, clean);
}

export function lookupCustomSign(word: string): SignDefinition | null {
  if (!word) return null;
  const clean = word.trim().toUpperCase().replace(/[\s-]/g, '_');
  const found = CUSTOM_SIGNS[clean] || CUSTOM_SIGNS[word.toUpperCase()];
  if (found) {
    if (!found.duration) {
      const w = WLASL_SIGN_MAP[clean] || WLASL_SIGN_MAP[word.toUpperCase()];
      found.duration = w?.duration || 1100;
    }
    if (!found.nmm) {
      const w = WLASL_SIGN_MAP[clean] || WLASL_SIGN_MAP[word.toUpperCase()];
      found.nmm = w?.nmm || { smile: 0.4, eyebrows: 'neutral' };
    }
    return found;
  }
  if (WLASL_SIGN_MAP[clean]) {
    const w = WLASL_SIGN_MAP[clean];
    return {
      gloss: w.gloss || clean,
      duration: w.duration || 1100,
      nmm: w.nmm || { smile: 0.4, eyebrows: 'neutral' },
      descriptionVi: w.descriptionVi,
      phases: convertProceduralToPhases(w.config, w.config.location, w.config.motion, w.config.twoHanded, w.nmm)
    };
  }
  return null;
}

export function getCustomSignGloss(word: string): string | null {
  const def = lookupCustomSign(word);
  return def ? def.gloss : null;
}

export function getCustomSignDescVi(word: string, signLang: 'asl' | 'vsl' = 'asl'): string | null {
  const def = lookupCustomSign(word) as CustomSignDefinition | null;
  if (!def) return null;
  if (signLang === 'vsl' && def.vslDesc) return def.vslDesc;
  if (signLang === 'asl' && def.aslDesc) return def.aslDesc;
  return def.descriptionVi || null;
}

export function buildCustomSignClip(word: string, opts: any = {}): any {
  const def = lookupCustomSign(word);
  if (!def) return null;

  try {
    const base = restingPose();
    const tl = new SignTimeline({ base, open: base });

    let hasTimelinePhase = false;
    def.phases.forEach((p: any, i: number) => {
      if (p.right?.shape || p.left?.shape || p.both?.shape) {
        hasTimelinePhase = true;
        tl.to(posePhase(p, base), p.t ?? 0.3, { ease: i === 0 ? 'out' : 'smooth' });
        if (p.hold) tl.hold(p.hold);
      }
    });

    if (hasTimelinePhase) {
      if (opts.settle !== false) {
        tl.settle(0.2);
      }
      return tl.build({ name: `sign-${word.toLowerCase()}` });
    }
  } catch (err) {
    console.warn(`[buildCustomSignClip] Fallback for ${word}:`, err);
  }

  return null;
}
