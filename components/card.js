import { PureComponent } from 'react'
import styled from 'react-emotion'
import { Motion, spring, presets } from 'react-motion'
import Loader from './loading-icon'

export default class extends PureComponent {
  render () {
    const { repo, getEmail, expand, loading, index } = this.props

    return (
      <Card
        // href={`https://github.com/${repo.full_name}`}
        // target='_blank'
        // role='button'
        // onClick={getEmail(repo.full_name)}
      >
        <About>

            <Number>#{index + 1}</Number>

            <Name>{repo.name}</Name>

            <Fullname>{repo.full_name}</Fullname>

            <div>{repo.stargazers_count} ★</div>

            <Description>{repo.description}</Description>

        </About>

        <Row>
          {/* <ActionButton>Profile</ActionButton> */}
          {/* <Seperator /> */}
          <ActionButton
            href={`https://github.com/${repo.full_name}`}
            target='_blank'
          >
            View Github
          </ActionButton>
        </Row>
      </Card>
    )
  }
}

const EmailIcon = props => (
  <svg width='16' height='16' version='1.1' viewBox='0 0 100 100'>
    <path fill='currentColor' d='M13.781 23L50 52.156 86.219 23zM9 26.813V77h82V26.812l-39.125 31.5a2.996 2.996 0 0 1-3.75 0z' />
  </svg>
)

const LoadingContainer = styled.div``

const Card = styled.div`
  border: 2px solid rgba(0,0,0,0.1);
  border-radius: 4px;
  background-color: white;
  position: relative;
  text-decoration: none;
  display: grid;
  overflow: hidden;
`

const Number = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding-top: 8px;
  padding-right: 8px;
`

const About = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 8px;
`

const Name = styled.h1`
  margin: 0;
  font-size: 18px;
`

const Description = styled.div`
  font-size: 14px;
  overflow: hidden;
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 2px solid rgba(0,0,0,0.1);
  margin-top: auto;
  background: rgba(0,0,0,0.05);
`

const ActionButton = styled.a`
  width: 100%;
  padding: 8px;
  border: 0;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  ${'' /* text-transform: uppercase; */}
  text-align: center;
  font-size: 12px;
  display: block;
  color: black;
  text-decoration: none;

  ${'' /* // &:first-of-type {
  //   border-right: 2px solid rgba(0,0,0,0.1);
  // } */}
`

const Fullname = styled.div`
  color: black;
  cursor: pointer;
`

const EmailContainer = styled.button`
  position: absolute;
  top: 8px;
  right: 0;
  background-color: transparent;
  border: 0px;
  cursor: pointer;
  transition: all 0.2s linear;
  opacity: 0.9;
  outline: none;
  color: rgba(0,0,0,0.75);

  &:hover {
    transform: scale(1.5);
    opacity: 1;
  }
`
