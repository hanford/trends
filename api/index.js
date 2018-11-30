const cors = require('cors');
const { join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const schema = require('./graphql');

const port = parseInt(process.env.PORT, 10) || 2999;
const dev = process.env.NODE_ENV !== 'production';

const graphql = query => query.join('');

const defaultQuery = graphql`
  query WeeklyTopJS {
    repos(language: "javascript", time: 8) {
      name
      full_name
      stargazers_count
    }
  }
`;

const server = express();

server.use(cors());

if (!dev) {
  server.get('*', (_, res, next) => {
    res.setHeader('Cache-Control', 'max-age=43200, immutable');
    next();
  });
}

server.get('/', (req, res) => res.redirect('/api/graphql'))

server.use(
  '/api/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    tracing: true,
    cacheControl: true,
  })
);

server.use(
  '/api/graphiql',
  graphiqlExpress({
    endpointURL: '/api/graphql',
    query: defaultQuery,
  })
);

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
