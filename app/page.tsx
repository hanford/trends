import { use } from "react";
import { headers } from "next/headers";

import getQueryData from "../helpers/query-data";

import { Repo } from "../@types/graphql";
import RepoList from "../components/RepoList";

export default async function Page(
  {
    // searchParams: { time: timeArg },
    // params: { language: languageArg },
  }
) {
  const data = await getData();

  return <RepoList repos={data.items} dark={false} />;
}

interface Res {
  language: string;
  time: number;
  dark: boolean;
  repos: Repo[];
}

// async function getData() {
//   const data = await fetch("https://dummyjson.com/products/1");
//   return data.json();
// }

async function getData(): Promise<Res> {
  const headersList = headers();

  const host = headersList.get("host");

  //dark
  // const { language, time } = getQueryData();
  // const language = getQueryData().language || "";
  // const time = getQueryData().time || "";

  const endpoint =
    process.env.NODE_ENV === "production"
      ? `https://${host}`
      : "http://localhost:3000";

  const url = `${endpoint}/api/repos`;
  const res = await fetch(url);
  return res.json();
  // "https://trends.vercel.app/api/repos"
}
