import { formatParams, getRepos } from "../../helpers/query-data";
import { Repo } from "../../types/repo";
import RepoList from "../../components/RepoList";

export default async function LanguagePage({
  params: { language: languageArg },
  searchParams: { time: timeArg }
}: any) {
  const data = await getData({
    language: languageArg,
    time: timeArg
  });

  return <RepoList repos={data.items} />;
}

interface Res {
  items: Repo[];
}

async function getData({
  language: languageArg,
  time: timeArg = 8
}): Promise<Res> {
  const { params } = formatParams(languageArg, timeArg);

  const res = await getRepos(params);

  return res.json();
}
