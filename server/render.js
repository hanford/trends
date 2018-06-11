const LRUCache = require('lru-cache')
const wrap = require('await-wrap')
const dev = process.env.NODE_ENV !== 'production'
const queryOrCookie = require('../helpers/query-or-cookie')

const ssrCache = new LRUCache({
  max: 150,
  maxAge: 1000 * 60 * 6 // 6 hour cache
})

const keyGen = (language, time) => `language=${language}&time=${time}`

module.exports = app => async (req, res, pagePath) => {
  const { language, time } = queryOrCookie(req.query, req.cookies)

  const key = keyGen(language, time)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    console.log(`CACHE HIT: ${key}`)

    return res.send(ssrCache.get(key))
  }

  const { err, data } = await wrap(app.renderToHTML(req, res, pagePath))

  if (err) return app.renderError(err, req, res, pagePath)

  console.log(`CACHE MISS: ${key}`)

  ssrCache.set(key, data)

  return res.send(data)
}
