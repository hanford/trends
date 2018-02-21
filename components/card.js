import { PureComponent } from 'react'
import styled from 'react-emotion'

export default class extends PureComponent {
  render () {
    const { repo, getEmail } = this.props

    return (
      <Card image={repo.owner.avatar_url} onClick={() => getEmail(repo.full_name)}>
        <About>
          <div>
            <Name>{repo.name}</Name>
            <Description>{repo.description}</Description>
          </div>
          <Row>
            <Fullname
              onClick={e => e.stopPropagation()}
              href={`https://github.com/${repo.full_name}`}
              target='_blank'
            >
              {repo.full_name}
            </Fullname>
            <div>{repo.stargazers_count} ★</div>
          </Row>
        </About>
      </Card>
    )
  }
}

const Card = styled.div`
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 4px;
  background-color: white;
  padding: 8px;
  position: relative;
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

const Fullname = styled.a`
  overflow: hidden;
  max-width: 80%;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: black !important;
  text-decoration: underline;
  cursor: pointer;
`
