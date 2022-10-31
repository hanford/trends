// import { headers } from "next/headers";
import { use } from "react";
import { formatParams, getRepos } from "../helpers/query-data";
import { Repo } from "../types/repo";
import RepoList from "../components/RepoList";

export default async function Page() {
  const data = await getData();

  console.log({ items: data.items.length });

  return <RepoList repos={data.items} />;
}

interface Res {
  items: Repo[];
}

async function getData(): Promise<Res> {
  const { params } = formatParams("", 8);

  const res = await getRepos(params);
  return res.json();
  // const data = await res.json();
  // res.setHeader("Cache-Control", "public, s-maxage=43200, maxage=43200");

  // return data;
}
