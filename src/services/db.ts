import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { TranslationHistoryItem, AppSettings, AvatarConfig } from '../types';

interface VietASLDB extends DBSchema {
  history: {
    key: string;
    value: TranslationHistoryItem;
    indexes: { 'by-date': number };
  };
  settings: {
    key: string;
    value: any;
  };
}

const DB_NAME = 'VietASL_Database';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase<VietASLDB>> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB<VietASLDB>(DB_NAME, DB_VERSION, {
      upgrade(db) {
        // History store
        const historyStore = db.createObjectStore('history', { keyPath: 'id' });
        historyStore.createIndex('by-date', 'timestamp');

        // Settings store
        db.createObjectStore('settings');
      }
    });
  }
  return dbPromise;
}

// History Operations
export async function addHistoryItem(item: TranslationHistoryItem): Promise<void> {
  const db = await getDB();
  await db.put('history', item);
}

export async function getAllHistory(): Promise<TranslationHistoryItem[]> {
  const db = await getDB();
  const items = await db.getAllFromIndex('history', 'by-date');
  return items.reverse(); // Most recent first
}

export async function deleteHistoryItem(id: string): Promise<void> {
  const db = await getDB();
  await db.delete('history', id);
}

export async function clearAllHistory(): Promise<void> {
  const db = await getDB();
  await db.clear('history');
}

// Settings Operations
export async function getStoredSettings(): Promise<Partial<AppSettings> | null> {
  const db = await getDB();
  return (await db.get('settings', 'app_settings')) || null;
}

export async function saveStoredSettings(settings: AppSettings): Promise<void> {
  const db = await getDB();
  await db.put('settings', settings, 'app_settings');
}

export async function getStoredAvatarConfig(): Promise<AvatarConfig | null> {
  const db = await getDB();
  return (await db.get('settings', 'avatar_config')) || null;
}

export async function saveStoredAvatarConfig(config: AvatarConfig): Promise<void> {
  const db = await getDB();
  await db.put('settings', config, 'avatar_config');
}
