import { languages, times } from "./constants";
import { stringify } from "querystring";

interface Query {
  language?: string;
  time?: number;
}

function getQueryData(query: Query = {}) {
  const langQuery = query.language;
  const timeQuery = query.time;

  const language = langQuery || languages["Top Overall"];
  const time = timeQuery || times["Past Week"];

  return {
    language: language === "Overall" ? encodedOverall : language,
    time
  };
}

const encodedOverall = encodeURIComponent(
  "javascript language:typescript language:python language:ruby language:go language:html language:css language:java language:swift language:php language:rust"
);

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
      per_page: "50",
      access_token: process.env.GH_ACCESS ? process.env.GH_ACCESS : undefined
    })
  );

  return { key, params };
}

export async function getRepos(searchParams = "") {
  const url = `https://api.github.com/search/repositories?${searchParams}`;
  console.log(url);

  return await fetch(url, {
    headers: { Accept: "application/vnd.github.preview" }
  });

  // return res.json();

  const data = await res.json();
  return data; // res.json();
  const items = await data.items;

  const cleaned = items.map(
    ({ name, forks, full_name, description, language, stargazers_count }) => {
      return {
        name: name || "",
        full_name: full_name || "",
        description: description || "",
        language: language || "None",
        forks: forks || 0,
        stargazers_count: stargazers_count || 0
      };
    }
  );

  return cleaned.slice(0, 60);
}
