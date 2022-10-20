import styles from "./Footer.module.css";

export default function FooterComponent({ dark }: { dark: boolean }) {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/hanford/trends"
        rel="noopener"
        target="_blank"
        className={styles.link}
        style={{
          color: dark ? "rgba(255, 255, 255, 0.75);" : "rgba(0, 0, 0, 0.9)"
        }}
      >
        View source code
      </a>
    </footer>
  );
}
