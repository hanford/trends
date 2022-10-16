import { languages, times } from "./constants";

interface Query {
  language?: string;
  time?: number;
  dark?: boolean;
}

export default function getQueryData(query: Query = {}) {
  const { language: langQuery, time: timeQuery, dark } = query;

  const language = langQuery || languages["Top Overall"];
  const time = timeQuery || times["Past Week"];

  return {
    language: language === "Overall" ? encodedOverall : language,
    time,
    dark
  };
}

const encodedOverall = encodeURIComponent(
  "javascript language:typescript language:python language:ruby language:go language:html language:css language:java language:swift language:php language:rust"
);
