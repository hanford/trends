export default function getApiUrl (isServer) {
  return process.browser
    ? ''
    : process.env.NODE_ENV === 'production' && process.env.NOW_URL
      ? process.env.NOW_URL
      : 'http://localhost:3000'
}
