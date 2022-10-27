import { headers } from "next/headers";

import { Repo } from "../@types/graphql";
import RepoList from "../components/RepoList";

export default async function Page() {
  const data = await getData();

  return <RepoList repos={data.items} />;
}

interface Res {
  items: Repo[];
}

async function getData(): Promise<Res> {
  const headersList = headers();

  const host = headersList.get("host");

  const endpoint =
    process.env.NODE_ENV === "production"
      ? `https://${host}`
      : "http://localhost:3000";

  const url = `${endpoint}/api/repos`;

  const res = await fetch(url);

  return res.json();
}
