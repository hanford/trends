import { PureComponent, Fragment } from 'react'
import Link from 'next/link'
import withFullHeight from 'full-height-hoc'
// import deferRenderHoc from 'defer-render-hoc'
import Drawer from 'react-drag-drawer'
import styled, { css } from 'react-emotion'
import { Motion, spring, presets } from 'react-motion'
import cookies from 'next-cookies'
import cookie from 'cookie-cutter'
import document from 'global/document'

import Head from '../components/head'
import Card from '../components/card'
import Navbar from '../components/navbar'
import { setLanguage, setTime, getTrending } from '../store/repos/actions'

const CookieJar = cookie(document)

const defaultState = {
  repo: '',
  loading: false,
  email: ''
}

class Index extends PureComponent {

  state = defaultState

  static async getInitialProps (ctx) {
    const { language, time } = cookies(ctx)
    const { store } = ctx

    if (language && cookies) {
      await store.dispatch(setLanguage(language))
      await store.dispatch(setTime(time))
      await store.dispatch(getTrending())
    }

    return {}
  }

  componentDidMount () {
    this.props.getTrending()
  }

  getRepo = name => ({ target: { value }}) => {
    this.setState({ [name]: value })
  }

  getEmail = fullName => async event => {
    event.preventDefault()

    this.props.fetchEmail(fullName)
  }

  fetchEmail = async event => {
    event.preventDefault()

    this.props.fetchEmail(this.state.repo)
  }

  render () {
    const { repo } = this.state

    const {
      setAndFetchTime,
      setAndFetchLanguage,
      getTrending,
      repos = [],
      loading = false,
      language,
      time,
      timeOptions = {},
      languageOptions = {},
      email,
      setEmail
    } = this.props

    return (
      <Fragment>
        <Head title='gitwho' />

        <Hero>
          <Navbar
            setAndFetchLanguage={setAndFetchLanguage}
            languageOptions={languageOptions}
            setAndFetchTime={setAndFetchTime}
            getRepo={this.getRepo}
            search={this.fetchEmail}
            loading={loading}
            timeOptions={timeOptions}
            time={time}
            language={language}
          />

          <br />

          <Row>
            {repos.map(repo => <Card expand={true} getEmail={this.getEmail} repo={repo} />)}
          </Row>

          <Drawer open={email !== ''} onRequestClose={() => setEmail('')} modalElementClass={DrawerCard}>
            <Grabber />

            {email}
          </Drawer>
        </Hero>
      </Fragment>
    )
  }
}

export default withFullHeight(Index)

const Hero = styled.div`
  width: 100%;
  color: #333;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 900px;

  @media(max-width: 767px) {
    flex-direction: column-reverse;
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(3, calc(300px - 8px));
  grid-gap: 8px;
  padding-bottom: 50px;

  @media(max-width: 900px) {
    grid-template-columns: repeat(2, calc(50% - 8px));
  }

  @media(max-width: 767px) {
    grid-template-columns: repeat(1, 100%);
    max-width: 100%;
    padding-bottom: 130px;
  }
`

const DrawerCard = css`
  height: 100%;
  margin-top: 200px;
  background-color: white;
  width: 100%;
  text-align: center;
  padding-top: 20px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media(min-width: 767px) {
    max-width: 400px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`

const Grabber = styled.div`
  position: absolute;
  top: 8px;
  width: 80px;
  border-radius: 10px;
  height: 4px;
  background-color: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
`
