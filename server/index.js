const express = require('express')
const next = require('next')
const { join } = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const bodyParser = require('body-parser')

const render = require('./render')
const { typeDefs, resolvers, schema } = require('./graphql')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const RenderCache = render(app)

const gql = String.raw

const defaultQuery = gql`
query WeeklyTopJS {
  repos(language: "javascript" time: 8) {
    name
    stargazers_count
  }
}
`

app.prepare()
  .then(() => {
    const server = express()

    server.use(cors())
    server.use(cookieParser())

    server.use(
      '/graphql',
      bodyParser.json(),
      graphqlExpress({
        schema,
        tracing: true,
        cacheControl: true
      })
    )

    server.use('/graphiql', graphiqlExpress({
      endpointURL: '/graphql',
      query: defaultQuery
    }))

    server.get('/service-worker.js', ServiceWorker(app))
    server.get('/', (req, res) => RenderCache(req, res, '/'))

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })

const ServiceWorker = app => (req, res) => {
  const filePath = join(__dirname, '../', '.next', 'service-worker.js')

  app.serveStatic(req, res, filePath)
}
