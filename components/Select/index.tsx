"use client";

import { useRouter, useSelectedLayoutSegment } from "next/navigation";

// import styles from "./Select.module.css";

export default function Select(props: any) {
  const { queryParam, value: defaultValue, options } = props;
  // const param = useSelectedLayoutSegment();
  const param = "overall";
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

  const onChange = event => {
    if (queryParam === "language") {
      router.push(`/${event.currentTarget.value}`);
    } else {
      router.push(`/${param}?time=${event.currentTarget.value}`);
    }
  };

  return (
    <label className={"labelContainer"}>
      <div className={"labelCopy"}>{capitalized}</div>

      <select
        className={"selector"}
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
