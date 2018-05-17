import { PureComponent } from 'react'
import styled from 'react-emotion'

export default class extends PureComponent {
  render () {
    const {
      repo: {
        name,
        language,
        full_name,
        description,
        stargazers_count
      }
    } = this.props

    return (
      <Card
        href={`https://github.com/${full_name}`}
        target='_blank'
        rel='noopener'
      >
        <About>
          <div>
            <Name>{name}</Name>
            <Secondary>{full_name}</Secondary>
          </div>

          <Description>{description}</Description>

          <Bottom>
            <Stars>★ {stargazers_count}</Stars>
          </Bottom>
        </About>
      </Card>
    )
  }
}

const Card = styled.a`
  box-shadow: 0 1px 1px 0 rgba(60,64,67,.08), 0 1px 3px 1px rgba(60,64,67,.16);
  border-radius: 0.4rem;
  background-color: white;
  position: relative;
  text-decoration: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  transition: box-shadow 135ms cubic-bezier(.4,0,.2,1),width 235ms cubic-bezier(.4,0,.2,1);

  &:hover {
    box-shadow: 0 1px 3px 1px rgba(60,64,67,.2), 0 2px 8px 4px rgba(60,64,67,.1);
  }
`

const Stars = styled.div`
  padding: 0.4rem;
  background: #fff59d;
  color: black;
  font-size: 1.4rem;
  border-top-left-radius: 0.4rem;
`

const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
`

const About = styled.div`
  display: flex;
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
`

const Description = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.6rem;
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
  padding: 0.8rem 0 1.6rem;
`
