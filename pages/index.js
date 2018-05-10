import { PureComponent } from 'react'
import cookies from 'next-cookies'

import { getTrending, setLanguage, setTime } from '../store/repos/actions'
import Index from '../components/index'
import { nextConnect } from '../store'

const mapStateToProps = (state, props) => ({
  repos: state.repos,
  language: state.language,
  time: state.time,
  languageOptions: state.languageOptions,
  timeOptions: state.timeOptions
})

const mapDispatchToProps = dispatch => ({
  // getTrending: () => dispatch(getTrending())
})

class IndexPage extends PureComponent {
  static async getInitialProps (ctx) {
    const { language: languageCookie, time: timeCookie } = cookies(ctx)
    const { store, req } = ctx

    let languageReq = undefined
    let timeReq = undefined

    if (req && req.query) {
      const { time = false, language = false } = req.query
      if (time) {
        timeReq = time
      }

      if (language) {
        languageReq = language
      }
    }

    console.log(timeReq, timeCookie)
    console.log(languageReq, languageCookie)

    const time = timeReq ? timeReq : timeCookie ? timeCookie : false
    const language = languageReq ? languageReq : languageCookie ? languageCookie : false

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

export default nextConnect(mapStateToProps, {})(IndexPage)
