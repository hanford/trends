import { Repo } from "../../@types/graphql";

// import style from "./card.module.css";

interface Props {
  repo: Repo;
}

export default function CardComponent(props: Props) {
  const {
    repo: { name, forks, full_name, description, language, stargazers_count }
  } = props;

  return (
    <a
      href={`https://github.com/${full_name}`}
      target="_blank"
      rel="noopener"
      className={"card"}
    >
      <div className={"about"}>
        <div>
          <div className={"name"}>{name}</div>
          <h3 className={"secondary"}>{full_name}</h3>
        </div>

        <p className={"description"}>{description}</p>

        <div className={"bottom"}>
          <div className={"detail"}>{language}</div>
          <div className={"detail"}>Forks {forks}</div>
          <div className={"stars"}>Stars {stargazers_count}</div>
        </div>
      </div>
    </a>
  );
}
