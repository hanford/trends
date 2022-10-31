"use client";

import {
  useSelectedLayoutSegment,
  useSearchParams,
  usePathname
} from "next/navigation";

import {
  languages as languageOptions,
  themes as themeOptions,
  times as timeOptions
} from "../../helpers/constants";
import Select from "../Select";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const time = useSearchParams().get("time") || 8;

  let params = "";

  if (pathname !== "/") {
    let maybeArray = useSelectedLayoutSegment();
    params = Array.isArray(maybeArray) ? maybeArray[0] : maybeArray;
  }

  const hasTheme = Object.entries(languageOptions).find(
    ([_, value]) => value === params
  );

  const theme = hasTheme ? hasTheme[0] : false;

  return (
    <div
      className={styles.navbar}
      style={{
        backgroundColor: `${
          theme ? themeOptions[theme || 0] : themeOptions["Top Overall"]
        }95`
      }}
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
          value={params}
        />

        <Select queryParam="time" options={timeOptions} value={time} />
      </form>
    </div>
  );
}
