import { ApolloServer } from "apollo-server-express";
import express from "express";
import cors from "cors";

import schema from "./graphql";
import { formatParams, getRepos } from "./common";

const port = parseInt(process.env.PORT || "2999", 10) || 2999;

const server = new ApolloServer({ schema, introspection: true });
const app = express();

app.use(cors());
server.applyMiddleware({ app, path: "/api/graphql", cors: true });

app.get("/api/repos", async (req, res) => {
  const { language, time = 7 } = req.query;
  const { params } = formatParams(language, time);

  const repos = await getRepos(params);

  return res.send(repos);
});

app.listen(port, (err: Error) => {
  if (err) throw err;

  // tslint:disable: no-console
  console.log(`Listening at http://localhost:${port}/`);
});
