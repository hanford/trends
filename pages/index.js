import { PureComponent, Fragment } from 'react'
import Link from 'next/link'
import withFullHeight from 'full-height-hoc'
import deferRenderHoc from 'defer-render-hoc'
import { get } from 'axios'
import Drawer from 'react-drag-drawer'
import styled, { css } from 'react-emotion'
import { Motion, spring, presets } from 'react-motion'

import Head from '../components/head'
import Card from '../components/card'

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

class Index extends PureComponent {

  state = {
    repo: '',
    loading: false,
    email: '',
    rendered: false,
    repos: [],
    language: languages['Top Overall'],
    time: time['Past Week']
  }

  componentDidMount () {
    this.setState({ rendered: true })
    this.getTrending()
  }

  getrepo = name => ({ target: { value }}) => {
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
    console.log(`/trending?language=${this.state.language}&daysAgo=${this.state.time}`)
    const res = await get(`/trending?language=${this.state.language}&daysAgo=${this.state.time}`)

    const { repos } = await res.data

    this.setState({ loading: false, repos })
  }

  changeLanguage = event => {
    this.setState({ language: event.target.value }, () => this.getTrending())
  }

  changeTime = event => {
    this.setState({ time: event.target.value }, () => this.getTrending())
  }

  render () {
    return (
      <Fragment>
        <Head title='gitwho' />

        <Hero>
          <Navbar>
            <div style={{display: 'flex', width: '100%', position: 'relative'}}>
              <IconSpace>
                {this.state.loading ? <Loader /> : <Search />}
              </IconSpace>

              <Form onSubmit={this.search}>
                <SearchInput
                  placeholder='hanford/next-offline'
                  type='search'
                  onChange={this.getrepo('repo')}
                  value={this.state.repo}
                />
              </Form>
            </div>

            <TuneContainer>
              <Select onChange={this.changeLanguage}>
                {Object.entries(languages).map(([key, value]) => (
                  <option key={key} value={value}>{key}</option>
                ))}
              </Select>
              <Select onChange={this.changeTime}>
                {Object.entries(time).map(([key, value]) => (
                  <option key={key} value={value}>{key}</option>
                ))}
              </Select>
            </TuneContainer>
          </Navbar>

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
export default deferRenderHoc(hasFullHeight)

const Search = props => (
  <Motion defaultStyle={{scale: 0}} style={{scale: spring(1, presets.wobbly)}}>
    {({ scale }) => (
      <svg width='40' height='40' version='1.1' viewBox='0 0 100 100' style={{transform: `scale(${scale})`}}>
        <path d='M47.102 32.602C39 32.602 32.5 39.204 32.5 47.204c0 8.102 6.602 14.602 14.602 14.602 8.102 0 14.602-6.602 14.602-14.602C61.7 39.2 55.2 32.602 47.102 32.602z' />
        <path d='M50.102 1.398C23.2 1.398 1.399 23.2 1.399 50.101c0 26.898 21.801 48.7 48.699 48.7C77 98.8 98.801 76.998 98.801 50.1 98.801 23.2 77 1.398 50.102 1.398zm23.699 73.703c-.7.7-1.8 1.102-3 1.102s-2.2-.398-3-1.102l-9.2-9.199-.898.5c-3.3 1.801-6.898 2.801-10.602 2.801-12.102 0-21.898-9.8-21.898-21.898 0-12.102 9.801-21.898 21.898-21.898 12.102 0 21.898 9.8 21.898 21.898 0 4.3-1.199 8.398-3.601 12l-.602 1 9.102 9.102c.699.8 1.199 1.8 1.199 2.898-.098.996-.496 1.996-1.297 2.797z' />
      </svg>
    )}
  </Motion>
)

const Loader = props => (
  <Motion defaultStyle={{scale: 0}} style={{scale: spring(1, presets.wobbly)}}>
    {({ scale }) => (
      <svg
        version='1.1'
        x='0px'
        y='0px'
        width='40px'
        height='40px'
        viewBox='0 0 50 50'
        style={{ enableBackground: 'new 0 0 50 50', transform: `scale(${scale})` }}
        xmlSpace='preserve'
      >
        <path
          fill='#000'
          d='M41.326 34.593c5.159-8.936 2.098-20.362-6.839-25.521-8.935-5.16-20.362-2.098-25.521 6.838l3.523 2.034c4.035-6.99 12.974-9.385 19.964-5.35 6.99 4.037 9.386 12.975 5.35 19.965l3.523 2.034z'
        >
          <animateTransform
            attributeType='xml'
            attributeName='transform'
            type='rotate'
            from='0 25 25'
            to='360 25 25'
            dur='0.6s'
            repeatCount='indefinite'
          />
        </path>
      </svg>
    )}
  </Motion>
)

const MAX_WIDTH = 900

const IconSpace = styled.div`
  position: absolute;
  left: 8px;
  display: flex;
  height: 100%;
  align-items: center;
`

const TuneContainer = styled.div`
  margin-top: 8px;
  display: flex;
  width: 100%;
`

const SearchInput = styled.input`
  -webkit-appearance: none;
  padding: 16px;
  border: 2px solid rgba(0,0,0,0.25);
  border-radius: 4px;
  font-size: 16px;

  width: 100%;
  padding-left: 54px;

  &:active,
  &:focus {
    border: 2px solid black;
    outline: none;
  }

  &:before {
    content: '';
  }

  @media(max-width: 767px) {
    width: 100%;
  }
`

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media(max-width: 767px) {
    flex-direction: column;
  }
`

const Navbar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: ${MAX_WIDTH}px;
  width: 100%;
  position: sticky;
  top: 0;
  padding-top: 8px;
  z-index: 10;
  background-color: white;
  box-shadow: 0 10px 10px white;

  @media(max-width: 767px) {
    box-shadow: 0 -10px 10px white;
    flex-direction: column;
    width: 100%;
    padding: 8px;
    position: fixed;
    bottom: 0;
    top: auto;
  }

  @supports (-webkit-overflow-scrolling: touch) {
    backdrop-filter: saturate(0) blur(20px);
    background-color: rgba(255, 255, 255, 0.75);
  }

  /* iphoneX */
  @media only screen
  and (device-width : 375px)
  and (device-height : 812px)
  and (-webkit-device-pixel-ratio : 3) {
    padding-bottom: 20px;
  }
`

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

const Select = styled.select`
  font-size: 16px;
  -webkit-appearance: none;
  background-color: white;
  border-radius: 4px;
  padding: 8px;
  border: 2px solid rgba(0,0,0,0.25);
  cursor: pointer;

  &:first-of-type {
    margin-right: 8px;
  }

  @media(max-width: 767px) {
    width: 100%;
  }
`
