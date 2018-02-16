const express = require('express')
const next = require('next')
const { get } = require('axios')
const cheerio = require('cheerio')
const { join } = require('path')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    server.get('/fetch', fetchEmail)

    server.get('/service-worker.js', (req, res) => {
      return app.serveStatic(req, res, join(__dirname, '.next', 'service-worker.js'))
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })

function extractEmail (text) {
  return text.match(/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g)
}

async function fetchEmail (req, res) {
  const { repo } = req.query
  const resp = await get(`https://github.com/${repo}/commits/master`)
  const { data: commitPage } = await resp

  let $ = cheerio.load(commitPage)
  const authors = {}

  $('.commit-author.tooltipped.tooltipped-s.user-mention').each(function(i, elem) {
    const author = $(this).text()

    return authors[author] !== undefined ? authors[author]++ : authors[author] = 0
  })

  let biggestContributor = {value: 0}

  Object.entries(authors).forEach(([key, value]) => {
    if (value > biggestContributor.value) {
      biggestContributor = {
        name: key,
        value
      }
    }
  })

  const individualCommitPage = await get(`https://github.com/${repo}/commits?author=${biggestContributor.name}`)
  const { data: individualPage } = await individualCommitPage

  $ = cheerio.load(individualPage)

  const { attribs: { href } } = $('.sha.btn.btn-outline.BtnGroup-item')[0]
  const gitData = await get(`https://github.com${href}.patch`)
  const { data } = await gitData


  const email = extractEmail(data)

  return res.send({ email })
}
