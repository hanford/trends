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

export default nextConnect(mapStateToProps, {})(IndexPage)
