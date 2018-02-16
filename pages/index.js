import { PureComponent, Fragment } from 'react'
import Link from 'next/link'
import withFullHeight from 'full-height-hoc'
import deferRenderHoc from 'defer-render-hoc'
import { Motion, spring, presets } from 'react-motion'
import Drawer from 'react-drag-drawer'
import styled, { css } from 'react-emotion'

import Head from '../components/head'

class Index extends PureComponent {
  state = {
    repo: '',
    loadingIndividual: false,
    loadingMany: false,
    email: '',
    rendered: false,
    drawer: false,
    devs: []
  }

  componentDidMount () {
    this.setState({ rendered: true })
  }

  getrepo = name => ({ target: { value }}) => {
    this.setState({ [name]: value })
  }

  search = async event => {
    event.preventDefault()

    this.setState({ loadingIndividual: true, email: '' })

    const res = await fetch(`/fetch?repo=${window.encodeURIComponent(this.state.repo)}`)

    const { email } = await res.json()

    this.setState({ loadingIndividual: false, email })
  }

  getTopTrending = async event => {
    event.preventDefault()
    event.stopPropagation()

    if (this.state.devs.length) {
      return this.toggleDrawer()
    }

    this.setState({ loadingMany: true })

    const res = await fetch(`/top?language=javascript`)

    const { top } = await res.json()

    this.setState({ loadingMany: false, drawer: true, devs: top })
  }

  toggleDrawer = event => {
    this.setState({ drawer: !this.state.drawer })
  }

  render () {
    console.log(this.state.devs)
    return (
      <Fragment>
        <Head title='Home' />

        <Motion defaultStyle={{scale: 0.5, slideDown: 20, opacity: 0}} style={{
          scale: spring(this.state.rendered ? 1 : 0.5, presets.stiff),
          opacity: spring(this.state.rendered ? 1 : 0)
        }}>
          {({ scale, opacity }) => (
            <Hero style={{transform: `scale(${scale})`, opacity}}>
              <Spy />
              <br />
              <Form onSubmit={this.search}>
                <SearchInput
                  placeholder='hanford/next-offline'
                  type='search'
                  onChange={this.getrepo('repo')}
                  value={this.state.repo}
                />
              </Form>

              <SearchButton>{this.state.loadingIndividual ? 'Loading...' : 'Search'}</SearchButton>
              <SearchButton onClick={this.getTopTrending}>{this.state.loadingMany ? 'Loading...' : 'Top JS Devs'}</SearchButton>

              <br />

              {this.state.email}
            </Hero>
          )}
        </Motion>

        <Drawer
          onRequestClose={this.toggleDrawer}
          open={this.state.drawer}
          modalElementClass={TopDevelopers}
        >
          <Table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Repo</th>
                <th>Stars</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.devs.map(d => (
                  <tr key={d.commitUrl}>
                    <td>{d.user}</td>
                    <td>{d.email}</td>
                    <td><a href={`https://github.com/${d.user}/${d.repo}`} target='_blank'>{d.repo}</a></td>
                    <td>{d.stars}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Drawer>
      </Fragment>
    )
  }
}

const hasFullHeight = withFullHeight(Index)

export default deferRenderHoc(hasFullHeight)

const Table = styled.table`
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  padding: 8px;
  border-collapse: collapse;

  td, th {
    padding: 8px;
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
`

const SearchInput = styled.input`
  -webkit-appearance: none;
  padding: 16px;
  border: 2px solid rgba(0,0,0,0.25);
  width: 300px;
  border-radius: 4px;
  font-size: 16px;

  &:active,
  &:focus {
    border: 2px solid black;
    outline: none;
  }
`

const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;

  @media(max-width: 767px) {
    flex-direction: column;
  }
`

const Hero = styled.div`
  width: 100%;
  color: #333;
  margin: 0 auto;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const TopDevelopers = css`
  width: 600px;
  height: 100%;
  background-color: white;
  margin-top: 200px;

  @media(max-width: 767px) {
    overflow-y: auto;
    max-width: 100%;
  }
`

const SearchButton = styled.button`
  padding: 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  width: 300px;
  background-color: black;
  color: white;
  border: 2px solid black;
  cursor: pointer;
  outline: none;
  margin-top: 10px;
  &:hover {
    background-color: rgba(0,0,0,0.75);
  }
`

const Spy = props => (
  <svg width='80px' height='80px' version='1.1' viewBox='0 0 100 100'>
    <path d='M97.73 92.676c-.121-.828-.242-1.617-.316-1.969-.985-4.906-2.641-9.172-5.063-13.047-2.09-3.328-4.656-5.808-7.574-7.386-4.238-2.25-8.633-4.442-12.867-6.56-1.7-.827-3.41-1.683-5.082-2.534l-1.32-.668c0 .066-.903 1.293-1.012 1.414-1.274 1.375-3.047 2.555-4.59 3.605-3.02 2.055-6.437 2.414-9.906 2.414-3.465 0-6.887-.363-9.906-2.414-1.543-1.05-3.317-2.23-4.59-3.605-.113-.121-1.012-1.348-1.012-1.414l-1.32.668c-1.672.855-3.383 1.71-5.082 2.535-4.238 2.117-8.633 4.312-12.867 6.558-2.918 1.579-5.48 4.06-7.574 7.387-2.426 3.875-4.078 8.14-5.063 13.047-.074.352-.195 1.145-.316 1.969a2.6 2.6 0 0 0 2.164 2.973C18.688 97.832 34.02 99.024 50 99.032c15.98-.008 31.312-1.2 45.566-3.383 1.41-.211 2.387-1.551 2.164-2.973zM50.277.969c-2.082.129-3.902.168-5.71.367-4.372.476-7.548 2.602-8.903 6.926-.594 1.886-.973 3.847-1.356 5.793-.117.597-.304.773-.886.847-2.73.34-5.477.633-8.18 1.141-2.238.422-4.41 1.168-6.172 2.723-2.09 1.847-1.785 4.418.43 5.988 2.59 1.836 5.98 1.031 8.933 1.004 1.625-.016 3.25-.024 4.875-.035 4.785-.028 9.57-.047 14.36-.063 5.085-.015 10.167-.023 15.253-.02 2.887.005 5.864.005 8.785.067 2.676.059 5.731.715 8.247-.465 1.847-.867 2.867-2.78 2.136-4.758-.883-2.386-3.86-3.418-6.07-4.109-3.082-.96-6.285-1.277-9.492-1.484-.563-.035-.723-.243-.832-.797-.387-1.946-.758-3.906-1.352-5.793-1.242-3.961-4.02-6.25-8.125-6.813-2.047-.281-4.125-.367-5.941-.52zM69.184 31.39c-.102-.629-1.219-.813-1.23-.813a52.274 52.274 0 0 0-3.774-.39c-1.7-.11-3.21-.16-4.621-.16-2 0-3.82.105-5.563.32-1.261.156-2.62.305-3.984.324-1.379-.023-2.738-.172-4-.324a45.122 45.122 0 0 0-5.562-.32c-1.41 0-2.922.05-4.622.16-1.128.07-2.363.2-3.773.39-.012 0-1.133.184-1.23.817-.07.465-.133 1.324.27 1.824.538.672.78 1.297.816 2.098.066 1.644.535 3.242 1.386 4.742.832 1.46 2.102 2.324 3.77 2.563a23.25 23.25 0 0 0 3.27.242 18.84 18.84 0 0 0 3.034-.239c2.332-.375 3.95-1.695 4.672-3.808.38-1.11.63-2.266.868-3.39.066-.313.132-.626.203-.938.16-.719.406-.852.89-.867.485.015.73.148.89.867.071.312.138.625.204.937.242 1.121.488 2.281.867 3.387.727 2.113 2.34 3.434 4.672 3.809.98.156 2 .238 3.035.238 1.047 0 2.149-.082 3.27-.242 1.668-.239 2.937-1.102 3.77-2.567.85-1.504 1.32-3.097 1.386-4.742.031-.797.277-1.426.816-2.098.403-.496.34-1.355.27-1.82zm-12.023 9.254c-2.273-.395-3.523-1.711-3.82-4.024-.047-.367-.075-.75-.098-1.12a26.764 26.764 0 0 0-.059-.774c-.082-.875.297-1.492 1.09-1.781a12.843 12.843 0 0 1 3.028-.723 23.25 23.25 0 0 1 2.5-.148c1.41 0 2.671.16 3.859.488 1.812.5 2.227 1.059 2.125 2.844-.066 1.144-.29 2.238-.64 3.16-.489 1.281-1.598 1.992-3.391 2.176-.473.047-.961.066-1.48.09-.24.011-.49.02-.747.035-.207-.02-.426-.032-.652-.047-.563-.04-1.145-.074-1.715-.176zm-16.031.176c-.227.015-.445.03-.652.047l-.746-.036c-.52-.02-1.008-.043-1.48-.09-1.794-.183-2.903-.894-3.392-2.175-.351-.922-.574-2.016-.64-3.16-.102-1.786.316-2.34 2.125-2.844 1.183-.328 2.445-.489 3.86-.489.773 0 1.593.047 2.5.149.98.105 2 .351 3.027.723.793.289 1.171.906 1.09 1.78-.024.262-.044.524-.06.778-.023.371-.05.754-.097 1.121-.297 2.313-1.547 3.625-3.82 4.024-.574.097-1.156.132-1.715.171zm29.972 7.312c-1.16-.637-2.57-.75-3.879-.309a.117.117 0 0 0-.07.153c.035.09.097.062.168.066.183.016.46.004.644.016.364.02.637.054.989.152.714.195 1.304.645 1.562 1.36.656 1.832-1.43 3.597-3.707 3.25-3-.461-4.598-2.543-6.617-4.57-.418-.419-.785-.872-1.156-1.317-2.149-2.567-6.43-2.367-8.59.191-.11.13-.223.258-.36.418a.13.13 0 0 1-.085.043.115.115 0 0 1-.086-.043c-.137-.16-.246-.289-.36-.418-2.16-2.558-6.445-2.758-8.59-.191-.375.445-.742.898-1.156 1.316-2.02 2.028-3.617 4.11-6.617 4.57-2.277.348-4.363-1.417-3.707-3.25.258-.714.848-1.16 1.563-1.359a4.45 4.45 0 0 1 .988-.152c.183-.008.46 0 .644-.016.07-.008.137.024.168-.066a.117.117 0 0 0-.07-.153c-1.305-.441-2.719-.332-3.879.309-1.418.781-2 2.074-1.621 3.55.504 1.954 2.023 3.169 4.129 3.927 2.137.765 4.383 1.191 6.703 1.355 3.336.234 6.508-.148 9.387-1.672.855-.453 1.668-.96 2.5-1.445.004 0 .004-.004.004-.004.004 0 .004 0 .004.004.832.484 1.644.996 2.5 1.445 2.878 1.524 6.05 1.906 9.386 1.672 2.32-.164 4.567-.586 6.703-1.355 2.106-.754 3.625-1.973 4.13-3.926.378-1.473-.204-2.77-1.622-3.551z' />
  </svg>
)
