import { PureComponent, Fragment } from 'react'
import Link from 'next/link'
import withFullHeight from 'full-height-hoc'
import Drawer from 'react-drag-drawer'
import styled, { css } from 'react-emotion'
import { Motion, spring, presets } from 'react-motion'
import cookies from 'next-cookies'

import Search from '../components/search-icon'
import Card from '../components/card'
import Navbar from '../components/navbar'
import Loader from '../components/loading-icon'
import Profile from '../components/profile'

import { setLanguage, setTime, getTrending } from '../store/repos/actions'

class Index extends PureComponent {

  state = {
    repo: '',
    openMobileNav: false,
    hasMounted: false,
    loadingCards: {}
  }

  static async getInitialProps (ctx) {
    const { language, time } = cookies(ctx)
    const { store } = ctx

    if (language) {
      await store.dispatch(setLanguage(language))
    }

    if (time) {
      await store.dispatch(setTime(time))
    }

    return {}
  }

  componentDidMount () {
    // get initial data if we don't SSR
    this.props.getTrending()
    this.setState({ hasMounted: true })
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

  showMobileNav = value => event => {
    this.setState({ openMobileNav: value === 'open' })
  }

  setCardLoading = (key, value) => event => {
    this.setState({
      loadingCards: {
        ...this.state.loadingCards,
        [key]: value
      }
    })
  }

  render () {
    const { repo, openMobileNav, hasMounted } = this.state

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
      setEmail,
      user
    } = this.props

    return (
      <Fragment>
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

          <Row>
            {
              repos.map((repo, index) => (
                <Card
                  index={index}
                  key={index}
                  expand={true}
                  getEmail={this.getEmail}
                  repo={repo}
                />
              ))
            }
          </Row>
        </Hero>

        <Drawer open={openMobileNav} onRequestClose={this.showMobileNav('close')} modalElementClass={DrawerCard}>
          <Grabber />

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
        </Drawer>

        <Drawer open={email !== ''} onRequestClose={() => setEmail('')} modalElementClass={DrawerCard}>
          <Grabber />

          <Profile email={email} user={user} />
        </Drawer>
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
  max-width: 1200px;

  @media(max-width: 767px) {
    flex-direction: column-reverse;
  }
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(calc(300px - 8px), 1fr));
  grid-gap: 8px;
  padding-bottom: 50px;
  width: 100%;
  margin-top: 1rem;

  @media(max-width: 767px) {
    margin-top: 0;
  }
`

const DrawerCard = css`
  height: 100%;
  margin-top: 200px;
  background-color: white;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  width: 700px;
  max-width: 100%;
  text-align: center;
  padding-top: 20px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media(min-width: 767px) {
    max-width: 700px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`

const Grabber = styled.div`
  position: absolute;
  top: 8px;
  width: 80px;
  margin: 0 auto;
  border-radius: 10px;
  height: 4px;
  background-color: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
`
