import { experimental_use as use } from "react";
import { headers } from "next/headers";

import { Repo } from "../@types/graphql";
import Card from "../components/card";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import getQueryData from "../helpers/query-data";
import "./root.css";
import { useSearchParam } from "next/navigation";

export default function TrendsApp({ searchParams }) {
  const { time, language, dark, repos } = use(fetchRepos({ ...searchParams }));

  return (
    <div
      className="hero"
      style={{ backgroundColor: dark ? "#303030" : "#f4f3f4" }}
    >
      <Navbar time={time} language={language} dark={dark} />

      <div className="container">
        <div className="row">
          {repos.length > 0
            ? repos.map((r, i) => <Card key={i} repo={r} dark={dark} />)
            : "Rate limit exceeded, try again in a moment"}
        </div>

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
