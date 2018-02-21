const express = require('express')
const next = require('next')
const { join } = require('path')
const getEmails = require('get-emails')

const Trending = require('./routes/trending')
const Top = require('./routes/top')
const Individual = require('./routes/individual')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    // `git clone --bare #{ARGV[1] || "https://github.com/"}#{repo_name}.git #{dir}`
    // `git log --pretty=format:'%an %ae%n%cn %ce'`

    server.get('/fetch', Individual)
    server.get('/top', Top)
    server.get('/trending', Trending)
    server.get('/service-worker.js', ServiceWorker(app))

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
