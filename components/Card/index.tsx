import { Repo } from "../../@types/graphql";

import styles from "./card.module.css";

interface Props {
  repo: Repo;
  dark: boolean;
}

export default function CardComponent(props: Props) {
  const {
    dark,
    repo: { name, forks, full_name, description, language, stargazers_count }
  } = props;

  const primary = dark ? "rgba(255, 255, 255, 0.75)" : "rgba(0, 0, 0, 0.87)";

  return (
    <a
      href={`https://github.com/${full_name}`}
      target="_blank"
      rel="noopener"
      className={"card"}
      style={{ backgroundColor: dark ? "#424242" : "white" }}
    >
      <div className={"about"}>
        <div>
          <div className={"name"} style={{ color: primary }}>
            {name}
          </div>
          <h3
            className={"secondary"}
            style={{
              color: dark ? "rgba(255, 255, 255, 0.55)" : "rgba(0, 0, 0, 0.54)"
            }}
          >
            {full_name}
          </h3>
        </div>

        <p className={"description"} style={{ color: primary }}>
          {description}
        </p>

        <div className={"bottom"}>
          <div className={"detail"} style={{ color: primary }}>
            {language}
          </div>
          <div className={"detail"} style={{ color: primary }}>
            Forks {forks}
          </div>
          <div className={"stars"}>Stars {stargazers_count}</div>
        </div>
      </div>
    </a>
  );
}
