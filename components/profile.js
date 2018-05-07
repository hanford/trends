import { PureComponent } from 'react'
import styled, { css } from 'react-emotion'

export default class Profile extends PureComponent {
  render () {
    const { user, email } = this.props
    return (
      <Container>
        <ProfileRow>
          <ProfileImage src={user.image} />
          <div style={{display: 'flex', alignItems: 'flex-start', flexDirection: 'column', paddingLeft: 8}}>
            <Name>{user.full_name}</Name>
            <Username>{user.username}</Username>
            <div>{email}</div>
          </div>
        </ProfileRow>
        <ViewUser href={`https://github.com/${user.username}`} target='_blank'>View user</ViewUser>
      </Container>
    )
  }
}

const ViewUser = styled.a`
  background-color: #269f42;
  background-image: linear-gradient(-180deg, #2fcb53 0%, #269f42 90%);
  border-color: rgba(27,31,35,0.5);
  color: white;
  font-weight: bold;
  width: 100%;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  font-size: 14px;
`

const ProfileImage = styled.img`
  height: 120px;
  border-radius: 4px;
  width: 120px;
`

const Container = styled.div`
  align-items: flex-start;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px;
`

const ProfileRow = styled.div`
  display: flex;
  margin-bottom: 8px;
`
const Name = styled.h1`
  margin: 0;
  font-size: 16px;
`

const Username = styled.h3`
  margin: 0;
  font-size: 12px;
  font-weight: 400;
  color: #586069;
`
