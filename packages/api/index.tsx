import express from "express";
import cors from "cors";

import { formatParams, getRepos } from "./common";

const port = parseInt(process.env.PORT || "2999", 10) || 2999;

const app = express();

app.use(cors());

app.get("/", async (_req, res) => {
  return res.sendStatus(200);
});

app.get("/api/repos", async (req, res) => {
  const { language, time = 7 } = req.query;
  const { params } = formatParams(language, time);

  const items = await getRepos(params);

  return res.send({ items });
});

app.listen(port, () => {
  // tslint:disable: no-console
  console.log(`Listening at http://localhost:${port}/`);
});
