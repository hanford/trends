"use client";

import {
  useRouter,
  usePathname,
  useSelectedLayoutSegment,
} from "next/navigation";

import style from "./style.module.css";

export default function Select(props: any) {
  const { queryParam, value: defaultValue, options } = props;

  let params = "overall";
  const pathname = usePathname();

  if (pathname !== "/") {
    params = useSelectedLayoutSegment();
  }

  const router = useRouter();
  const capitalized = capitalizeFirstLetter(queryParam);

  // const onChange = useCallback(
  //   event => {
  //     if (queryParam === "language") {
  //       router.push(`/${event.currentTarget.value}`);
  //     } else {
  //       router.push(`/${param}?time=${event.currentTarget.value}`);
  //     }
  //   },
  //   [param]
  // );

  const onChange = (event) => {
    if (queryParam === "language") {
      router.push(`/${event.currentTarget.value}`);
    } else {
      router.push(`/${params}?time=${event.currentTarget.value}`);
    }
  };

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
