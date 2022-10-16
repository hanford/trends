import styles from "../../components/RepoList/RepoList.module.css";

const Cards = new Array(50)
  .fill(true)
  .map(() => <div className="loadingCard" />);

export default function LoadingRepos() {
  return <div className="row">{Cards}</div>;
}
