import { formatParams, getRepos } from "../helpers/query-data";
import { Repo } from "../types/repo";
import RepoList from "../components/RepoList";

export default async function Page() {
  const data = await getData();

  return <RepoList repos={data.items} />;
}

interface Res {
  items: Repo[];
}

async function getData(): Promise<Res> {
  const { params } = formatParams("", 8);

  const res = await getRepos(params);

  return res.json();
}
