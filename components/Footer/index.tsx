import style from "./Footer.module.css";

export default function FooterComponent() {
  return (
    <footer className={style.footer}>
      <a
        href="https://github.com/hanford/trends"
        rel="noopener"
        target="_blank"
        className={style.link}
      >
        View source code
      </a>
    </footer>
  );
}
