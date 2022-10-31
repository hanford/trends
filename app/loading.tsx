// import styles from "../components/RepoList/RepoList.module.css";

const Cards = new Array(70)
  .fill(true)
  .map((_, i) => <div className={"loadingCard"} key={i} />);

export default function LoadingRepos() {
  return <div className={"row"}>{Cards}</div>;
}
