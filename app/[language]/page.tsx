import { headers } from "next/headers";

import getQueryData from "../../helpers/query-data";

import { Repo } from "../../types/repo";
import RepoList from "../../components/RepoList";

export default async function LanguagePage({
  params: { language: languageArg },
  searchParams: { time: timeArg }
}: any) {
  const { repos } = await getData({
    language: languageArg,
    time: timeArg
  });

  return <RepoList repos={repos} />;
}

interface Res {
  language: string;
  time: number;
  dark: boolean;
  repos: Repo[];
}

async function getData({ language: languageArg, time: timeArg }): Promise<Res> {
  const headersList = headers();

  const host = headersList.get("host");

  const { language, time, dark } = getQueryData({
    language: languageArg,
    time: timeArg
  });

  const endpoint =
    process.env.NODE_ENV === "production"
      ? `https://${host}`
      : "http://localhost:3000";

  const res = await fetch(
    `${endpoint}/api/repos?language=${language}&time=${time}`
  );

  const data = await res.json();
  const repos = await data.items;

  return {
    time,
    language,
    dark,
    repos
  };
}
