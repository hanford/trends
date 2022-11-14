"use client";
import { SyntheticEvent, useCallback } from "react";
import {
  useRouter,
  usePathname,
  useSearchParams,
  useSelectedLayoutSegment
} from "next/navigation";

import style from "./style.module.css";

export default function Slect(props: any) {
  const { queryParam, value: defaultValue, options } = props;

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const capitalized = capitalizeFirstLetter(queryParam);
  const hasTime = searchParams.get("time");

  let params = "overall";

  // conditionally invoke useSelectedLayoutSegment so it doesn't throw on `/`
  if (pathname !== "/") {
    params = useSelectedLayoutSegment();
  }

  const onChange = useCallback(
    (event: SyntheticEvent<HTMLSelectElement>) => {
      if (queryParam === "language") {
        const hasTimeParam = hasTime ? `?time=${hasTime}` : "";

        router.push(`/${event.currentTarget.value}${hasTimeParam}`);
      } else {
        router.push(`/${params}?time=${event.currentTarget.value}`);
      }
    },
    [router, params]
  );

  return (
    <label className={style.labelContainer}>
      <div className={style.labelCopy}>{capitalized}</div>

      <select
        className={style.selector}
        aria-label={`select ${capitalized}`}
        name={queryParam}
        id={queryParam}
        defaultValue={String(defaultValue)}
        onChange={onChange}
      >
        {Object.entries(options).map(([key, value]) => (
          <option className="selectable" key={key} value={value as string}>
            {key}
          </option>
        ))}
      </select>
    </label>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
