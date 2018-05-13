import { PureComponent } from 'react'
import styled from 'react-emotion'

export default class extends PureComponent {
  render () {
    const { repo } = this.props

    return (
      <Card
        href={`https://github.com/${repo.full_name}`}
        target='_blank'
        rel='noopener'
      >
        <About>
          <div>
            <Name>{repo.name}</Name>
            <Secondary>{repo.full_name}</Secondary>
            <Secondary>{repo.language}</Secondary>
            <Secondary>{repo.stargazers_count} ★</Secondary>
          </div>

          <Description>{repo.description}</Description>
        </About>
      </Card>
    )
  }
}

const Card = styled.a`
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  border-radius: 0.4rem;
  background-color: white;
  position: relative;
  text-decoration: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  transition: all 0.2s ease-in;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1rem, rgba(0, 0, 0, 0.2) 0px 1px 1rem;
  }
`

const About = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
`

const Name = styled.h1`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  max-width: 100%;

  font-size: 2.4rem;
  color: rgba(0, 0, 0, 0.87);
  display: block;
  line-height: 3.6rem;
`

const Description = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.6rem;
  padding: 1.6rem 0;
  margin: 0;
  color: rgba(0, 0, 0, 0.87);
`

const Secondary = styled.h3`
  font-weight: normal;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.54);
  display: block;

  &:not(:first-of-type) {
    padding-top: 0.4rem;
  }
`
