import { PureComponent } from 'react'
import styled from 'react-emotion'

export default class extends PureComponent {
  render () {
    const { repo, index } = this.props

    return (
      <Card>
        <About>
          <Top>
            <Title>
              <Name>{repo.name}</Name>
              <Number>#{index + 1}</Number>
            </Title>

            <Fullname>{repo.full_name}</Fullname>
            <Description>{repo.description}</Description>
          </Top>
          <StatsRow>
            <div>{repo.stargazers_count} ★</div>

            <div>{repo.language}</div>
          </StatsRow>
        </About>

        <Row>
          <ActionButton
            href={`https://github.com/${repo.full_name}`}
            target='_blank'
            rel='noopener'
          >
            View Github Repo
          </ActionButton>
        </Row>
      </Card>
    )
  }
}

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

const Top = styled.div`
  display: flex;
  flex-direction: column;
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
  overflow: hidden;
  text-overflow: ellipsis;
`

const Row = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 2px solid rgba(0,0,0,0.1);
  background: rgba(0,0,0,0.03);
`

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
`

const Fullname = styled.h3`
  font-size: 1.6rem;
  font-weight: normal;
  margin: 0;
  margin-top: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
