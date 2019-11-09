import { gql } from "apollo-server-core";
import { makeExecutableSchema } from "graphql-tools";
import LRUCache from "lru-cache";
const dev = process.env.NODE_ENV !== "production";

import { formatParams, getRepos } from "./common";

const cache = new LRUCache({
  max: 150,
  maxAge: 1000 * 60 * 60 * 6 // 6 hour cache
});

const typeDefs = gql`
  type Query @cacheControl(maxAge: 36000) {
    repos(language: String!, time: Int): [Repo]!
  }

  type Repo @cacheControl(maxAge: 36000) {
    id: ID
    forks: Int!
    name: String!
    language: String!
    full_name: String!
    description: String
    stargazers_count: Int!
  }
`;

const resolvers = {
  Query: {
    async repos(_root, args, _context) {
      const { time = 7, language: lang } = args;

      const { params, key } = formatParams(lang, time);

      // If we have a response in memory, let's return early
      if (dev && cache.has(key)) {
        // tslint:disable: no-console
        console.log(`GITHUB CACHE HIT: ${key}`);

        return cache.get(key);
      }

      const items = await getRepos(params);

      cache.set(key, items);

      return items;
    }
  }
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema;
