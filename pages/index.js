import { nextConnect } from '../store'
import { getTrending, setAndFetchLanguage, setAndFetchTime, fetchEmail, setEmail } from '../store/repos/actions'
import IndexPage from '../components/index'

const mapStateToProps = (state, props) => ({
  repos: state.repos,
  language: state.language,
  time: state.time,
  languageOptions: state.languageOptions,
  timeOptions: state.timeOptions,
  loading: state.loading,
  email: state.email,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getTrending: () => dispatch(getTrending()),
  setAndFetchLanguage: (language) => dispatch(setAndFetchLanguage(language)),
  setAndFetchTime: (time) => dispatch(setAndFetchTime(time)),
  fetchEmail: (email) => dispatch(fetchEmail(email)),
  setEmail: (email) => dispatch(setEmail(email))
})

export default nextConnect(mapStateToProps, mapDispatchToProps)(IndexPage)
