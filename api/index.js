const cors = require('cors');
const { join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const schema = require('./graphql');

const port = parseInt(process.env.PORT, 10) || 3000;
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

server.get('/', (req, res) => {
  res.redirect('/graphql');
})

server.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({
    schema,
    tracing: true,
    cacheControl: true,
  })
);

server.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
    query: defaultQuery,
  })
);

// server.get('/service-worker.js', ServiceWorker(app));

server.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});

const ServiceWorker = app => (req, res) => {
  const filePath = join(__dirname, '../', '.next', 'service-worker.js');

  app.serveStatic(req, res, filePath);
};
