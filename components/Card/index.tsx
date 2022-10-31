import { Repo } from "../../types/repo";

import style from "./Card.module.css";

export default function CardComponent(props: { repo: Repo }) {
  const {
    repo: { name, forks, full_name, description, language, stargazers_count }
  } = props;

  return (
    <a
      href={`https://github.com/${full_name}`}
      target="_blank"
      rel="noopener"
      className={style.card}
    >
      <div className={style.about}>
        <div>
          <div className={style.name} title={name}>
            {name}
          </div>

          <h3 className={style.secondary} title={full_name}>
            {full_name}
          </h3>
        </div>

        <p className={style.description} title={description}>
          {description}
        </p>
      </div>

      <div className={style.bottom}>
        <div className={style.detail}>{language}</div>
        <div className={style.detail}>Forks {forks}</div>
        <div className={style.stars}>Stars {stargazers_count}</div>
      </div>
    </a>
  );
}
