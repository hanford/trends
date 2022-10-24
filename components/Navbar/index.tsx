"use client";

import {
  languages as languageOptions,
  themes as themeOptions,
  times as timeOptions
} from "../../helpers/constants";
import Select from "../Select";
import { useSelectedLayoutSegment } from "next/navigation";

import styles from "./Navbar.module.css";

interface Props {
  language: string;
  time: number;
}

export default function Navbar({ language, time }: Props) {
  const params = useSelectedLayoutSegment();

  const hasTheme = Object.entries(languageOptions).find(
    ([_, value]) => value === params
  );

  const theme = hasTheme ? hasTheme[0] : false;

  return (
    <div
      className={"navbar"}
      style={{
        backgroundColor: `${
          theme ? themeOptions[theme || 0] : themeOptions["Top Overall"]
        }95`
      }}
    >
      <form aria-label="search" name="tune" method="GET" className={"form"}>
        <Select
          queryParam="language"
          options={languageOptions}
          value={language}
        />
        <Select queryParam="time" options={timeOptions} value={time} />
      </form>
    </div>
  );
}
