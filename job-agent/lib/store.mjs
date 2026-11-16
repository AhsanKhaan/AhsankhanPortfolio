import { readFileSync, writeFileSync, existsSync, renameSync } from "node:fs";
import { join } from "node:path";
import { DATA_DIR, ensureDirs } from "./env.mjs";

// Three JSON documents keyed by id. Written via temp file + rename so a crash mid-write
// can never leave a half-written tracker behind.
const FILES = {
  companies: "companies.json",
  jobs: "jobs.json",
  applications: "applications.json",
  state: "state.json",
};

export function load(name) {
  ensureDirs();
  const path = join(DATA_DIR, FILES[name]);
  return existsSync(path) ? JSON.parse(readFileSync(path, "utf8")) : {};
}

export function save(name, data) {
  ensureDirs();
  const path = join(DATA_DIR, FILES[name]);
  writeFileSync(`${path}.tmp`, JSON.stringify(data, null, 2));
  renameSync(`${path}.tmp`, path);
}

export const now = () => new Date().toISOString();

export function setStatus(record, status, note) {
  record.status = status;
  record.history = [...(record.history ?? []), { at: now(), status, ...(note ? { note } : {}) }];
}
