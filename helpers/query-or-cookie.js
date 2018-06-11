const { times, languages } = require('./constants')

module.exports = queryOrCookie

function queryOrCookie (query = {}, cookies = {}) {
  const { language: langQuery, time: timeQuery } = query
  const { language: langCookie, time: timeCookie } = cookies

  const language = langQuery ? langQuery : langCookie ? langCookie : languages['Top Overall']
  const time = timeQuery ? timeQuery : timeCookie ? timeCookie : times['Past Week']

  return { language, time }
}
