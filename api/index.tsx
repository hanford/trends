import { ApolloServer } from "apollo-server-express";
import express from "express";

import schema from "./graphql";

const port = parseInt(process.env.PORT || "2999", 10) || 2999;

const server = new ApolloServer({ schema, introspection: true });

const app = express();

server.applyMiddleware({ app, path: "/api/graphql", cors: true });

app.get("/", (_req, res) => res.redirect("/api/graphql"));

app.listen(port, (err: Error) => {
  if (err) {
    throw err;
  }
  // tslint:disable: no-console
  console.log(`Listening at http://localhost:${port}/`);
});
