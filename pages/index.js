import { PureComponent, Fragment } from 'react'
import Link from 'next/link'
import withFullHeight from 'full-height-hoc'
// import deferRenderHoc from 'defer-render-hoc'
import { get } from 'axios'
import Drawer from 'react-drag-drawer'
import styled, { css } from 'react-emotion'
import { Motion, spring, presets } from 'react-motion'
import cookies from 'next-cookies'
import cookie from 'cookie-cutter'
import document from 'global/document'

import Head from '../components/head'
import Card from '../components/card'
import Navbar from '../components/navbar'

const CookieJar = cookie(document)

const languages = {
  'Top Overall': encodeURIComponent('javascript language:python language:ruby language:go language:html language:css language:java'),
  'Top Javascript': 'javascript',
  'Top Go': 'go',
  'Top Web': 'html language:css',
  'Top CSS': 'css',
  'Top C#': encodeURIComponent('C#'),
  'Top Python': 'python',
  'Top Ruby': 'ruby',
  'Top Java': 'java'
}

const time = {
  'Past Week': 8,
  'Past Day': 2,
  'Past Month': 32,
  'Past Year': 365
}

const defaultState = {
  repo: '',
  loading: false,
  email: '',
  repos: [],
  language: languages['Top Overall'],
  time: time['Past Week']
}

class Index extends PureComponent {

  state = defaultState

  static getInitialProps (ctx) {
    const { language, time } = cookies(ctx)

    if (language) {
      console.log({ language, time })
    }

    return { }
  }

  componentDidMount () {
    this.getTrending()
  }

  getRepo = name => ({ target: { value }}) => {
    this.setState({ [name]: value })
  }

  search = async event => {
    event.preventDefault()

    this.setState({ loading: true, email: '' })

    const res = await get(`/fetch?repo=${window.encodeURIComponent(this.state.repo)}`)

    const { email } = await res.data

    this.setState({ loading: false, email })
  }

  getEmail = fullName => async event => {
    event.preventDefault()

    this.setState({ loading: true, email: '' })

    const res = await get(`/fetch?repo=${window.encodeURIComponent(fullName)}`)

    const { email } = await res.data

    this.setState({ loading: false, email })
  }

  getTrending = async () => {
    this.setState({ loading: true })

    const res = await get(`/trending?language=${this.state.language}&daysAgo=${this.state.time}`)

    const { repos } = await res.data

    this.setState({ loading: false, repos })
  }

  changeLanguage = event => {
    const { value } = event.target

    this.setState({ language: value }, () => {
      CookieJar.set('language', value)

      this.getTrending()
    })
  }

  changeTime = event => {
    const { value } = event.target

    this.setState({ time: value }, () => {
      CookieJar.set('time', value)

      this.getTrending()
    })
  }

  render () {
    const { loading, repo } = this.state

    return (
      <Fragment>
        <Head title='gitwho' />

        <Hero>
          <Navbar
            changeLanguage={this.changeLanguage}
            changeTime={this.changeTime}
            getRepo={this.getRepo}
            languages={languages}
            search={this.search}
            loading={loading}
            time={time}
            repo={repo}
          />

          <br />

          <Row>
            {this.state.repos.map(repo => <Card expand={true} getEmail={this.getEmail} repo={repo} />)}
          </Row>

          <Drawer open={this.state.email} onRequestClose={() => this.setState({ email: '' })} modalElementClass={DrawerCard}>
            <Grabber />
            {this.state.email}
          </Drawer>
        </Hero>
      </Fragment>
    )
  }
}

const hasFullHeight = withFullHeight(Index)

export default hasFullHeight

const MAX_WIDTH = 900

const Hero = styled.div`
  width: 100%;
  color: #333;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: ${MAX_WIDTH}px;

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
