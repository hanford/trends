import { PureComponent } from 'react'
import withFullHeight from 'full-height-hoc'
import styled, { css } from 'react-emotion'

import { gridGap, maxWidth } from './style-constants'
import Card from './card'
import Navbar from './navbar'
import Footer from './footer'

class Index extends PureComponent {
  render () {
    const {
      time,
      language,
      repos = [],
      timeOptions = {},
      languageOptions = {}
    } = this.props

    return (
      <Hero>
        <Navbar
          time={time}
          language={language}
          timeOptions={timeOptions}
          languageOptions={languageOptions}
        />

        <Row>
          {
            repos.map((repo, index) => (
              <Card
                key={index}
                repo={repo}
                index={index}
              />
            ))
          }
        </Row>

        <Footer />
      </Hero>
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
  background-color: #f4f3f4;
`

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(calc(30rem - ${gridGap}), 1fr));
  grid-gap: ${gridGap};
  padding: 0 ${gridGap};
  padding-bottom: 5rem;
  width: 100%;
  margin-top: 2rem;
  max-width: ${maxWidth};

  @media(max-width: 767px) {
    margin-top: 0;
    padding: ${gridGap};
  }
`
