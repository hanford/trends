import { stringify } from "querystring";
import fetch from "isomorphic-fetch";

export default async function handler(req, res) {
  const { language, time = 7 } = req.query;
  const { params } = formatParams(language, time);

  const items = await getRepos(params);

  return res.send({ items });
}

function formatParams(lang, time) {
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
      access_token: process.env.GH_ACCESS
    })
  );

  return { key, params };
}

async function getRepos(searchParams) {
  const url = `https://api.github.com/search/repositories?${searchParams}`;

  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github.preview" }
  });

  const data = await res.json();
  const items = await data.items;

  return items;
}
