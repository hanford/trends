import { gql } from "apollo-server-core";
import fetch from "isomorphic-fetch";
import LRUCache from "lru-cache";
import { stringify } from "querystring";

const dev = process.env.NODE_ENV !== "production";

const cache = new LRUCache({
  max: 150,
  maxAge: 1000 * 60 * 60 * 6 // 6 hour cache
});

export const typeDefs = gql`
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

export const resolvers = {
  Query: {
    async repos(_root, args, _context) {
      const { time = 7, language: lang } = args;

      const language = lang ? ` language:${lang}` : "";

      const startDate = new Date();

      startDate.setDate(startDate.getDate() - time);

      const startDateString = `
        ${startDate.getFullYear()}-${("0" + (startDate.getMonth() + 1)).slice(
        -2
      )}-${("0" + startDate.getDate()).slice(-2)}
      `.trim();

      const key = startDateString + language;

      // If we have a response in memory, let's return early
      if (dev && cache.has(key)) {
        // tslint:disable: no-console
        console.log(`GITHUB CACHE HIT: ${key}`);

        return cache.get(key);
      }

      const searchParams = unescape(
        stringify({
          sort: "stars",
          order: "desc",
          q: "created:>" + key,
          per_page: "100",
          access_token: process.env.GITHUB_ACCESS_TOKEN
        })
      );

      const res = await fetch(
        `https://api.github.com/search/repositories?${searchParams}`,
        { headers: { Accept: "application/vnd.github.preview" } }
      );
      const data = await res.json();
      const items = await data.items;

      cache.set(key, items);

      return items;
    }
  }
};
