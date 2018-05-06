export default function getApiUrl (isServer) {
  return isServer && process.env.NOW_URL ? process.env.NOW_URL : ''
}
