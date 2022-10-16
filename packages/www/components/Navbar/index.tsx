import {
  languages as languageOptions,
  themes as themeOptions,
  times as timeOptions
} from "../../helpers/constants";
import styles from "./Navbar.module.css";
import Select from "../Select";

interface Props {
  language: string;
  time: number;
  dark: boolean;
}

export default ({ language, time, dark }: Props) => {
  const hasTheme = Object.entries(languageOptions).find(
    ([_, value]) => value === language
  );

  const theme = hasTheme ? hasTheme[0] : false;

  return (
    <div
      className={styles.navbar}
      style={{ backgroundColor: `${themeOptions[theme || 0]}95` }}
    >
      <form
        aria-label="search"
        name="tune"
        method="GET"
        className={styles.form}
      >
        <Select
          queryParam="language"
          options={languageOptions}
          value={language}
        />

        <Select queryParam="time" options={timeOptions} value={time} />

        <label className={styles.darkmodeContainer}>
          {dark ? <Moon /> : <Sun />}

          <input
            type="checkbox"
            checked={dark}
            name="dark"
            id="dark"
            style={{ display: "none" }}
          />
        </label>
      </form>
    </div>
  );
};

const Moon = () => (
  <svg
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 100 100"
    className={styles.icon}
  >
    <path
      d="M35.143 11C19.81 16.682 11 31.448 11 48.757 11 70.983 29.017 89 51.243 89 68.55 89 83.318 80.19 89 64.857c-4.583 1.843-9.585 2.786-14.828 2.786-21.967 0-41.815-19.848-41.815-41.815 0-5.243.943-10.245 2.786-14.828z"
      fill="#FFF"
    />
  </svg>
);

const Sun = () => (
  <svg
    fill="#FFF"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 48 48"
    xmlSpace="preserve"
    className={styles.icon}
  >
    <circle cx={24} cy={24} r="11.91" />
    <path d="M24 9.94c1.07 0 1.94-.87 1.94-1.94V5.1c0-1.07-.87-1.94-1.94-1.94s-1.94.87-1.94 1.94V8c0 1.07.87 1.94 1.94 1.94zm0 28.12c-1.07 0-1.94.87-1.94 1.94v2.91c0 1.07.87 1.94 1.94 1.94s1.94-.87 1.94-1.94V40c0-1.07-.87-1.94-1.94-1.94zM9.94 24c0-1.07-.87-1.94-1.94-1.94H5.1c-1.07 0-1.94.87-1.94 1.94s.87 1.94 1.94 1.94H8c1.07 0 1.94-.87 1.94-1.94zm32.96-1.94H40c-1.07 0-1.94.87-1.94 1.94s.87 1.94 1.94 1.94h2.91c1.07 0 1.94-.87 1.94-1.94s-.88-1.94-1.95-1.94zm-31.58-8c.37.37.85.57 1.37.57.52 0 1-.2 1.37-.57.75-.75.75-1.98 0-2.74L12 9.26c-.73-.73-2.01-.73-2.74 0a1.95 1.95 0 0 0 0 2.74l2.06 2.06zm25.36 19.88a1.94 1.94 0 0 0-3.31 1.37c0 .52.2 1 .57 1.37L36 38.74a1.93 1.93 0 0 0 2.74 0c.75-.75.75-1.98 0-2.74l-2.06-2.06zm-25.36 0L9.26 36c-.75.76-.75 1.98.01 2.74.37.36.85.56 1.36.56.52 0 1-.2 1.37-.57l2.06-2.06c.37-.37.57-.85.57-1.37s-.2-1-.57-1.37c-.76-.74-1.99-.74-2.74.01zm23.99-19.31c.52 0 1-.2 1.37-.57L38.74 12c.75-.76.75-1.98 0-2.74-.74-.73-2.01-.73-2.74 0l-2.06 2.06a1.95 1.95 0 0 0 0 2.74c.37.36.85.57 1.37.57z" />
  </svg>
);
