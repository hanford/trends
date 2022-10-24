"use client";

import {
  languages as languageOptions,
  themes as themeOptions,
  times as timeOptions,
} from "../../helpers/constants";
import Select from "../Select";
import {
  useSelectedLayoutSegment,
  useSearchParams,
  usePathname,
} from "next/navigation";

import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const { time = 8 } = useSearchParams();

  let params = "overall";

  if (pathname !== "/") {
    params = useSelectedLayoutSegment();
  }

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
        }95`,
      }}
    >
      <form aria-label="search" name="tune" method="GET" className={"form"}>
        <Select
          queryParam="language"
          options={languageOptions}
          value={params}
        />

        <Select queryParam="time" options={timeOptions} value={time} />

        {/* here for responsiveness */}
        {/* <div /> */}
      </form>
    </div>
  );
}
