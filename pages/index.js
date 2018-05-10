import { PureComponent } from 'react'
import { nextConnect } from '../store'
import { getTrending, setAndFetchLanguage, setAndFetchTime, fetchEmail, setEmail, setLanguage, setTime } from '../store/repos/actions'
import Index from '../components/index'
import cookies from 'next-cookies'

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

class IndexPage extends PureComponent {
  static async getInitialProps (ctx) {
    const { language, time } = cookies(ctx)
    const { store } = ctx

    if (language) {
      await store.dispatch(setLanguage(language))
    }

    if (time) {
      await store.dispatch(setTime(time))
    }

    await store.dispatch(getTrending())

    return {}
  }

  render () {
    return (
      <Index {...this.props} />
    )
  }
}

export default nextConnect(mapStateToProps, mapDispatchToProps)(IndexPage)
