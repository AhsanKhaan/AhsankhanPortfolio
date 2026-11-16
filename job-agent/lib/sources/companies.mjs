import { politeFetch } from "../http.mjs";
import { domainOf } from "../text.mjs";

// Company discovery by location. Google Places API (New) when GOOGLE_MAPS_API_KEY is set
// (official API — scraping Google Maps itself breaks its terms), else OpenStreetMap.
// Returns { name, website, domain, address, source }.

export async function placesSearch(query) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  if (!key) return null;
  const res = await politeFetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    delayMs: 300,
    headers: {
      "content-type": "application/json",
      "x-goog-api-key": key,
      "x-goog-fieldmask": "places.id,places.displayName,places.websiteUri,places.formattedAddress",
    },
    body: JSON.stringify({ textQuery: query, pageSize: 20 }),
  });
  if (!res.ok) throw new Error(`Places API ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  return (data.places ?? [])
    .filter((p) => p.websiteUri)
    .map((p) => ({
      name: p.displayName?.text ?? "",
      website: p.websiteUri,
      domain: domainOf(p.websiteUri),
      address: p.formattedAddress ?? "",
      source: "google-places",
    }));
}

// Tech offices with a website tag inside a named city boundary.
export async function osmCompanies(area) {
  const query = `[out:json][timeout:40];
area["name:en"="${area}"]["boundary"="administrative"]->.a;
nwr(area.a)["office"~"^(it|software|company|telecommunication|financial|research)$"]["website"];
out tags 300;`;
  const res = await politeFetch("https://overpass-api.de/api/interpreter", {
    method: "POST",
    delayMs: 3000,
    timeoutMs: 60000,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: `data=${encodeURIComponent(query)}`,
  });
  if (!res.ok) throw new Error(`Overpass ${res.status}`);
  const data = await res.json();
  return (data.elements ?? [])
    .map((e) => {
      const t = e.tags ?? {};
      const website = t.website || t["contact:website"];
      return {
        name: t["name:en"] || t.name || "",
        website,
        domain: website ? domainOf(website.startsWith("http") ? website : `https://${website}`) : null,
        address: [t["addr:street"], t["addr:city"] || area].filter(Boolean).join(", "),
        source: "osm",
      };
    })
    .filter((c) => c.name && c.domain);
}
