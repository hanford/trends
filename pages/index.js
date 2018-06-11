import { PureComponent } from 'react'
import cookies from 'next-cookies'

import { getTrending, setLanguage, setTime } from '../store/actions'
import Index from '../components/index'
import { nextConnect } from '../store'
import { getTheme } from '../store/selectors'
import queryOrCookie from '../helpers/query-or-cookie'

const mapStateToProps = (state, props) => ({
  repos: state.repos,
  language: state.language,
  time: state.time,
  languageOptions: state.languageOptions,
  timeOptions: state.timeOptions,
  theme: getTheme(state)
})

const mapDispatchToProps = dispatch => ({
  // getTrending: () => dispatch(getTrending())
})

class IndexPage extends PureComponent {
  static async getInitialProps (ctx) {
    const { store, query, req } = ctx
    const { language, time } = queryOrCookie(req.query, cookies(ctx))

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
