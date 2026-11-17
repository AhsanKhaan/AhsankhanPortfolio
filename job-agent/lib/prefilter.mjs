// Cheap deterministic gate before any agent spends effort on a job: targeted title,
// enough stack overlap, and a location the candidate can actually work from.
const SKILL_PATTERNS = {
  "next.js": /\bnext\.?js\b/i,
  "node.js": /\bnode(\.?js)?\b/i,
  java: /\bjava\b(?!\s*script)/i,
  "rest api": /\brest(ful)?\s*api/i,
  "micro-frontend": /micro[- ]?frontend/i,
};

const truncateLoc = (s) => (s.length > 60 ? `${s.slice(0, 60)}…` : s);
const has = (text, term) => (SKILL_PATTERNS[term] ?? new RegExp(`\\b${term.replace(/[.+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i")).test(text);
const word = (text, term) => new RegExp(`(^|[^a-z])${term.replace(/[.+?^${}()|[\]\\]/g, "\\$&")}($|[^a-z])`, "i").test(text);

export function prefilter(job, targets) {
  const title = job.title.toLowerCase();
  if (!targets.titleInclude.some((k) => title.includes(k))) return { pass: false, reason: "title not targeted" };
  const excluded = targets.titleExclude.find((k) => word(title, k));
  if (excluded) return { pass: false, reason: `title excludes "${excluded}"` };

  const text = `${job.title}\n${job.description}`;
  const hits = targets.skills.filter((s) => has(text, s));
  if (job.description && hits.length < targets.minSkillHits) return { pass: false, reason: `only ${hits.length} stack matches`, hits };

  const loc = (job.location ?? "").toLowerCase().trim();
  if (job.remote) {
    // Open to the candidate's region explicitly, or an unqualified "remote". Anything
    // that names other countries/regions without naming one of ours is a restriction.
    const open = targets.remoteAllow.some((k) => word(loc, k));
    const unqualified = !loc || /^(remote|fully remote|100% remote)$/.test(loc);
    if (!open && !unqualified) return { pass: false, reason: `remote restricted to "${truncateLoc(job.location)}"`, hits };
  } else if (!targets.onsiteLocations.some((k) => loc.includes(k)) && !/remote/i.test(loc)) {
    return { pass: false, reason: `on-site in "${job.location}"`, hits };
  }

  return { pass: true, hits, score: hits.length };
}
