import { Repo } from "../../types/repo";
import Card from "../Card";
import styles from "./RepoList.module.css";

export default function RepoList({ repos }) {
  return (
    <div className={styles.row}>
      {repos && repos.length > 0 ? (
        repos.map((r: Repo, i: number) => <Card key={i} repo={r} />)
      ) : (
        <span className={styles.rateLimit}>
          Rate limit exceeded, try again in a moment
        </span>
      )}
    </div>
  );
}
