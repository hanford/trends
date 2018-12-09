const { times, languages } = require("./constants");

export default function getQueryData(query = {}) {
  const { language: langQuery, time: timeQuery } = query;

  const language = langQuery ? langQuery : languages["Top Overall"];
  const time = timeQuery ? timeQuery : times["Past Week"];

  return { language, time };
}
