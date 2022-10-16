import Card from "../Card";

import styles from "./RepoList.module.css";

export default function RepoList({ repos, dark }) {
  return (
    <div className={styles.row}>
      {!repos.length || repos.length > 0
        ? repos.map((r, i) => <Card key={i} repo={r} dark={dark} />)
        : "Rate limit exceeded, try again in a moment"}
    </div>
  );
}
