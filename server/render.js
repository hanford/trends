const LRUCache = require('lru-cache')
const wrap = require('await-wrap')
const dev = process.env.NODE_ENV !== 'production'

const ssrCache = new LRUCache({
  max: 150,
  maxAge: 1000 * 60 * 6 // 6 hour cache
})

module.exports = app => async (req, res, pagePath) => {
  // If we have a page in the cache, let's serve it
  if (ssrCache.has(req.url)) {
    console.log(`CACHE HIT: ${req.url}`)

    return res.send(ssrCache.get(req.url))
  }

  const { err, data } = await wrap(app.renderToHTML(req, res, pagePath))

  if (err) return app.renderError(err, req, res, pagePath)

  console.log(`CACHE MISS: ${req.url}`)

  ssrCache.set(req.url, data)

  return res.send(data)
}
