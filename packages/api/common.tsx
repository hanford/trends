import fetch from "isomorphic-fetch";
import { stringify } from "querystring";

export function formatParams(lang, time) {
  const language = lang ? ` language:${lang}` : "";

  const startDate = new Date();

  startDate.setDate(startDate.getDate() - time);

  const startDateString = `
    ${startDate.getFullYear()}-${("0" + (startDate.getMonth() + 1)).slice(
    -2
  )}-${("0" + startDate.getDate()).slice(-2)}
  `.trim();

  const key = startDateString + language;

  const params = unescape(
    stringify({
      sort: "stars",
      order: "desc",
      q: "created:>" + key,
      per_page: "100",
      access_token: process.env.GITHUB_ACCESS_TOKEN
    })
  );

  return { key, params };
}

export async function getRepos(searchParams) {
  const res = await fetch(
    `https://api.github.com/search/repositories?${searchParams}`,
    { headers: { Accept: "application/vnd.github.preview" } }
  );
  const data = await res.json();
  const items = await data.items;

  return items;
}
