import { readFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
export const AGENT_DIR = join(ROOT, "job-agent");
export const DATA_DIR = join(AGENT_DIR, "data");
export const INBOX_DIR = join(DATA_DIR, "inbox");
export const PROCESSED_DIR = join(INBOX_DIR, "processed");
export const OUTBOX_DIR = join(DATA_DIR, "outbox");

// Runs outside Next.js, which is the only thing that loads .env.local automatically.
export function loadEnv() {
  const path = join(ROOT, ".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!match) continue;
    const [, key, raw = ""] = match;
    if (process.env[key] === undefined) process.env[key] = raw.trim().replace(/^["']|["']$/g, "");
  }
}

export function loadConfig() {
  return JSON.parse(readFileSync(join(AGENT_DIR, "config.json"), "utf8"));
}

export function loadProfile() {
  return JSON.parse(readFileSync(join(ROOT, "brand/profile.json"), "utf8"));
}

export function ensureDirs() {
  for (const dir of [DATA_DIR, INBOX_DIR, PROCESSED_DIR, OUTBOX_DIR]) mkdirSync(dir, { recursive: true });
}
