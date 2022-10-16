"use client";

import styles from "./select.module.css";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// async function update(queryParam, value, router) {
//   await fetch(`http://localhost:3000/?${queryParam}=${value}`);

//   router.replace(`/?${queryParam}=${value}`);

//   // Refresh the current route and fetch new data from the server
//   router.reload();
// }

export default function Todo(props: any) {
  const { queryParam, value: defaultValue, options } = props;

  return (
    <label className={styles.bigLabel}>
      <div className={styles.labelLabel}>{queryParam}</div>

      <select
        className={styles.selector}
        aria-label="select time"
        name={queryParam}
        id={queryParam}
        defaultValue={String(defaultValue)}
        onChange={(event) => {
          event.currentTarget.form.submit();
        }}
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
