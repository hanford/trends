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
          <Title>
            <Name>{repo.name}</Name>
            <Number>#{index + 1}</Number>
          </Title>
          <Fullname>{repo.full_name}</Fullname>
          <Description>{repo.description}</Description>
          <div>{repo.stargazers_count} ★</div>
        </About>

        <Row>
          {/* <ActionButton>Profile</ActionButton> */}
          {/* <Seperator /> */}
          <ActionButton
            href={`https://github.com/${repo.full_name}`}
            target='_blank'
            rel='noopener'
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
  border: 0.2rem solid rgba(0,0,0,0.1);
  border-radius: 0.4rem;
  background-color: white;
  position: relative;
  text-decoration: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

const Number = styled.div`
`

const Title = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  justify-content: space-between;
`

const About = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0.8rem;
  overflow: hidden;
  flex: 1;
`

const Name = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  max-width: 90%;
`

const Description = styled.p`
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 2px solid rgba(0,0,0,0.1);
  background: rgba(0,0,0,0.03);
`

const ActionButton = styled.a`
  width: 100%;
  padding: 0.8rem;
  border: 0;
  background-color: transparent;
  outline: none;
  cursor: pointer;

  text-align: center;
  font-size: 1.4rem;
  display: block;
  color: black;
  text-decoration: none;

  ${'' /* // &:first-of-type {
  //   border-right: 2px solid rgba(0,0,0,0.1);
  // } */}
`

const Fullname = styled.h3`
  font-size: 1.6rem;
  font-weight: normal;
  margin: 0;
`

// const EmailContainer = styled.button`
//   position: absolute;
//   top: 0.8rem;
//   right: 0;
//   background-color: transparent;
//   border: 0px;
//   cursor: pointer;
//   transition: all 0.2s linear;
//   opacity: 0.9;
//   outline: none;
//   color: rgba(0,0,0,0.75);

//   &:hover {
//     transform: scale(1.5);
//     opacity: 1;
//   }
// `
