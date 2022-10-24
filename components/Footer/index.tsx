import styles from "./Footer.module.css";

export default function FooterComponent() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/hanford/trends"
        rel="noopener"
        target="_blank"
        className={styles.link}
      >
        View source code
      </a>
    </footer>
  );
}
