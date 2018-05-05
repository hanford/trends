import { PureComponent } from 'react'
import styled from 'react-emotion'
import { Motion, spring, presets } from 'react-motion'

export default class extends PureComponent {
  render () {
    const { repo, getEmail, expand } = this.props

    return (
      <Card
        onClick={e => e.stopPropagation()}
        href={`https://github.com/${repo.full_name}`}
        target='_blank'
      >
        <About>
          <div>
            <Name>{repo.name}</Name>

            <EmailContainer onClick={getEmail(repo.full_name)}>
              <EmailIcon />
            </EmailContainer>
            <Description>{repo.description}</Description>
          </div>
          <Row>
            <Fullname>{repo.full_name}</Fullname>
            <div>{repo.stargazers_count} ★</div>
          </Row>
        </About>
      </Card>
    )
  }
}

const EmailIcon = props => (
  <svg width='16' height='16' version='1.1' viewBox='0 0 100 100'>
    <path fill='currentColor' d='M13.781 23L50 52.156 86.219 23zM9 26.813V77h82V26.812l-39.125 31.5a2.996 2.996 0 0 1-3.75 0z' />
  </svg>
)

const Card = styled.a`
  border: 2px solid rgba(0,0,0,0.1);
  border-radius: 4px;
  background-color: white;
  padding: 8px;
  position: relative;
  cursor: pointer;
  color: black !important;
  text-decoration: none;

  &:hover {
    border: 2px solid black;
  }
`

const About = styled.div`
  height: 100px;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const Name = styled.div`
  font-size: 18px;
  padding-bottom: 8px;
  overflow: hidden;
  max-width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
`

const Description = styled.div`
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Fullname = styled.div`
  overflow: hidden;
  max-width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: black !important;
  text-decoration: underline;
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
