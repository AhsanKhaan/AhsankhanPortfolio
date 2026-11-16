import { getJson } from "../http.mjs";
import { htmlToText, decodeEntities } from "../text.mjs";

// Public job-board APIs of the common applicant-tracking systems. Companies publish
// these feeds precisely so jobs can be read programmatically.
const PATTERNS = [
  ["greenhouse", /(?:boards|job-boards)(?:\.eu)?\.greenhouse\.io\/(?:embed\/job_board(?:\/js)?\?for=)?([a-z0-9_-]+)/i],
  ["lever", /jobs(?:\.eu)?\.lever\.co\/([a-z0-9_.-]+)/i],
  ["ashby", /jobs\.ashbyhq\.com\/([a-z0-9_.%-]+)/i],
  ["workable", /apply\.workable\.com\/([a-z0-9_-]+)/i],
  ["smartrecruiters", /(?:careers|jobs)\.smartrecruiters\.com\/([a-z0-9_-]+)/i],
  ["recruitee", /([a-z0-9-]+)\.recruitee\.com/i],
];
const IGNORED_TOKENS = new Set(["embed", "api", "v1", "js", "jobs", "careers", "www", "static", "assets"]);

export function detectAts(text) {
  for (const [type, re] of PATTERNS) {
    const m = text.match(re);
    if (m && !IGNORED_TOKENS.has(m[1].toLowerCase())) return { type, token: decodeURIComponent(m[1]) };
  }
  return null;
}

const base = (company, type) => ({ source: `ats:${type}`, company, remote: false, companyDomain: null });

const FETCHERS = {
  async greenhouse(token, company) {
    const data = await getJson(`https://boards-api.greenhouse.io/v1/boards/${token}/jobs?content=true`);
    return (data.jobs ?? []).map((j) => ({
      ...base(company, "greenhouse"),
      sourceId: String(j.id),
      title: j.title,
      location: j.location?.name ?? "",
      remote: /remote/i.test(j.location?.name ?? ""),
      url: j.absolute_url,
      applyUrl: j.absolute_url,
      description: htmlToText(decodeEntities(j.content ?? "")),
      postedAt: j.updated_at,
    }));
  },
  async lever(token, company) {
    const data = await getJson(`https://api.lever.co/v0/postings/${token}?mode=json`);
    return (Array.isArray(data) ? data : []).map((j) => ({
      ...base(company, "lever"),
      sourceId: j.id,
      title: j.text,
      location: j.categories?.location ?? "",
      remote: j.workplaceType === "remote" || /remote/i.test(j.categories?.location ?? ""),
      url: j.hostedUrl,
      applyUrl: j.applyUrl || j.hostedUrl,
      description: [j.descriptionPlain, ...(j.lists ?? []).map((l) => `${l.text}\n${htmlToText(l.content)}`), j.additionalPlain].filter(Boolean).join("\n\n"),
      postedAt: j.createdAt ? new Date(j.createdAt).toISOString() : null,
    }));
  },
  async ashby(token, company) {
    const data = await getJson(`https://api.ashbyhq.com/posting-api/job-board/${encodeURIComponent(token)}`);
    return (data.jobs ?? []).map((j) => ({
      ...base(company, "ashby"),
      sourceId: j.id,
      title: j.title,
      location: j.location ?? "",
      remote: Boolean(j.isRemote),
      url: j.jobUrl,
      applyUrl: j.applyUrl || j.jobUrl,
      description: j.descriptionPlain || htmlToText(j.descriptionHtml ?? ""),
      postedAt: j.publishedAt,
    }));
  },
  async workable(token, company) {
    const data = await getJson(`https://apply.workable.com/api/v1/widget/accounts/${token}?details=true`);
    return (data.jobs ?? []).map((j) => ({
      ...base(company, "workable"),
      sourceId: j.shortcode,
      title: j.title,
      location: [j.city, j.country].filter(Boolean).join(", "),
      remote: Boolean(j.telecommuting),
      url: j.url,
      applyUrl: j.application_url || j.url,
      description: htmlToText(j.description ?? ""),
      postedAt: j.published_on,
    }));
  },
  async smartrecruiters(token, company) {
    const data = await getJson(`https://api.smartrecruiters.com/v1/companies/${token}/postings?limit=100`);
    return (data.content ?? []).map((j) => ({
      ...base(company, "smartrecruiters"),
      sourceId: j.id,
      title: j.name,
      location: [j.location?.city, j.location?.country].filter(Boolean).join(", "),
      remote: Boolean(j.location?.remote),
      url: `https://jobs.smartrecruiters.com/${token}/${j.id}`,
      applyUrl: `https://jobs.smartrecruiters.com/${token}/${j.id}`,
      description: "",
      detailsUrl: j.ref,
      postedAt: j.releasedDate,
    }));
  },
  async recruitee(token, company) {
    const data = await getJson(`https://${token}.recruitee.com/api/offers/`);
    return (data.offers ?? []).map((j) => ({
      ...base(company, "recruitee"),
      sourceId: String(j.id),
      title: j.title,
      location: j.location ?? "",
      remote: Boolean(j.remote),
      url: j.careers_url,
      applyUrl: j.careers_apply_url || j.careers_url,
      description: htmlToText(`${j.description ?? ""}\n${j.requirements ?? ""}`),
      postedAt: j.published_at,
    }));
  },
};

export async function fetchAtsJobs({ type, token }, company) {
  const fetcher = FETCHERS[type];
  if (!fetcher) throw new Error(`Unsupported ATS: ${type}`);
  return fetcher(token, company);
}

// SmartRecruiters lists postings without descriptions; fetch one on demand for a job worth scoring.
export async function hydrateDescription(job) {
  if (job.description || !job.detailsUrl) return job.description;
  const detail = await getJson(job.detailsUrl);
  const sections = detail.jobAd?.sections ?? {};
  return htmlToText(Object.values(sections).map((s) => `${s.title ?? ""}\n${s.text ?? ""}`).join("\n\n"));
}
