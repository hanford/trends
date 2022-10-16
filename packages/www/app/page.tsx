import { experimental_use as use } from "react";
import { headers } from "next/headers";

import { Repo } from "../@types/graphql";
import RepoList from "../components/RepoList";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import getQueryData from "../helpers/query-data";

import "./root.css";

export default function TrendsApp({
  searchParams: { language: languageArg, time: timeArg }
}) {
  const { time, language, dark, repos } = use(
    fetchRepos({ language: languageArg, time: timeArg })
  );

  return (
    <div
      className="hero"
      style={{ backgroundColor: dark ? "#303030" : "#f4f3f4" }}
    >
      <Navbar time={time} language={language} dark={dark} />

      <div className="container">
        <RepoList repos={repos} dark={dark} />

        <Footer dark={dark} />
      </div>
    </div>
  );
}

interface Res {
  language: string;
  time: number;
  dark: boolean;
  repos: Repo[];
}

async function fetchRepos({
  language: languageArg,
  time: timeArg
}): Promise<Res> {
  const headersList = headers();

  const host = headersList.get("host");

  const { language, time, dark } = getQueryData({
    language: languageArg,
    time: timeArg
  });

  const endpoint =
    process.env.NODE_ENV === "production"
      ? `https://${host}`
      : "http://localhost:2999";

  const res = await fetch(
    `${endpoint}/api/repos?language=${language}&time=${time}`,
    {}
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
