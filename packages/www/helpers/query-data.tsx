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

  return { language, time, dark };
}
