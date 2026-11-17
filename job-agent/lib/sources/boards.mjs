import { getJson } from "../http.mjs";
import { htmlToText, domainOf } from "../text.mjs";

// One failed search shouldn't discard the others' results.
async function eachSearch(searches, fn) {
  const errors = [];
  for (const term of searches) {
    try {
      await fn(term);
    } catch (err) {
      errors.push(`${term}: ${err.message}`);
    }
  }
  if (errors.length === searches.length) throw new Error(errors[0]);
}

// Public remote-job APIs. Each returns normalized jobs:
// { source, sourceId, title, company, companyDomain, location, remote, url, applyUrl, description, postedAt }
// These boards ask for attribution and light usage: one run a day, results kept private.

async function remotive(searches) {
  const seen = new Map();
  await eachSearch(searches, async (term) => {
    const data = await getJson(`https://remotive.com/api/remote-jobs?category=software-dev&search=${encodeURIComponent(term)}&limit=50`);
    for (const j of data.jobs ?? []) {
      seen.set(j.id, {
        source: "remotive",
        sourceId: String(j.id),
        title: j.title,
        company: j.company_name,
        companyDomain: null,
        location: j.candidate_required_location || "Remote",
        remote: true,
        url: j.url,
        applyUrl: j.url,
        description: htmlToText(j.description),
        postedAt: j.publication_date,
      });
    }
  });
  return [...seen.values()];
}

async function arbeitnow() {
  const data = await getJson("https://www.arbeitnow.com/api/job-board-api");
  return (data.data ?? [])
    .filter((j) => j.remote)
    .map((j) => ({
      source: "arbeitnow",
      sourceId: j.slug,
      title: j.title,
      company: j.company_name,
      companyDomain: null,
      location: j.location || "Remote",
      remote: true,
      url: j.url,
      applyUrl: j.url,
      description: htmlToText(j.description),
      postedAt: j.created_at ? new Date(j.created_at * 1000).toISOString() : null,
    }));
}

async function jobicy(searches) {
  const seen = new Map();
  await eachSearch(searches, async (tag) => {
    const data = await getJson(`https://jobicy.com/api/v2/remote-jobs?count=50&tag=${encodeURIComponent(tag)}`);
    for (const j of data.jobs ?? []) {
      seen.set(j.id, {
        source: "jobicy",
        sourceId: String(j.id),
        title: htmlToText(j.jobTitle),
        company: j.companyName,
        companyDomain: null,
        location: j.jobGeo || "Remote",
        remote: true,
        url: j.url,
        applyUrl: j.url,
        description: htmlToText(j.jobDescription),
        postedAt: j.pubDate,
      });
    }
  });
  return [...seen.values()];
}

// locationRestrictions is an explicit country list; an empty list means worldwide.
async function himalayas(searches) {
  const seen = new Map();
  await eachSearch(searches, async (term) => {
    const data = await getJson(`https://himalayas.app/jobs/api/search?q=${encodeURIComponent(term)}&limit=20`);
    for (const j of data.jobs ?? []) {
      const id = j.guid || j.applicationLink;
      seen.set(id, {
        source: "himalayas",
        sourceId: id,
        title: j.title,
        company: j.companyName,
        companyDomain: null,
        location: (j.locationRestrictions ?? []).join(", ") || "Worldwide",
        remote: true,
        url: j.applicationLink,
        applyUrl: j.applicationLink,
        description: htmlToText(j.description || j.excerpt || ""),
        postedAt: j.pubDate ? new Date(j.pubDate * 1000).toISOString() : null,
      });
    }
  });
  return [...seen.values()];
}

async function remoteok() {
  const data = await getJson("https://remoteok.com/api", { timeoutMs: 30000 });
  return (Array.isArray(data) ? data : [])
    .filter((j) => j.id && j.position)
    .map((j) => ({
      source: "remoteok",
      sourceId: String(j.id),
      title: j.position,
      company: j.company,
      companyDomain: j.apply_url ? domainOf(j.apply_url) : null,
      location: j.location || "Worldwide",
      remote: true,
      url: j.url,
      applyUrl: j.apply_url || j.url,
      description: htmlToText(j.description),
      postedAt: j.date,
    }));
}

export const BOARDS = { remotive, arbeitnow, jobicy, himalayas, remoteok };
