import { use } from "react";
import { headers } from "next/headers";

import getQueryData from "../helpers/query-data";

import { Repo } from "../@types/graphql";
import RepoList from "../components/RepoList";

export default async function Page({
  searchParams: { time: timeArg },
  params: { language: languageArg }
}) {
  const data = await getData({
    language: languageArg,
    time: timeArg
  });

  console.log({ data });

  return <RepoList repos={data} dark={false} />;
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

  //dark
  const { language, time } = getQueryData({
    language: languageArg,
    time: timeArg
  });

  const endpoint =
    process.env.NODE_ENV === "production"
      ? `https://${host}`
      : "http://localhost:3000";

  const url = `${endpoint}/api/repos?language=${language}&time=${time}`;
  console.log({ url });
  const res = await fetch(url);

  return res.json();

  // try {
  //   repos = data.items;
  // } catch (error) {
  //   console.error(error);
  // }

  // // console.log({ res });

  // return {
  //   time,
  //   language,
  //   dark,
  //   repos: repos,
  // };
}
