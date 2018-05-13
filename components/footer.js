import styled from 'react-emotion'

export default () => (
  <Footer>
    <a href='https://jackhanford.com' rel='noopener' target='_blank'>Jack Hanford</a>
    &nbsp;-&nbsp;
    <a href='https://github.com/hanford/trends' rel='noopener' target='_blank'>See the code</a>
  </Footer>
)

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 4rem;

  @media(max-width: 767px) {
    display: none;
  }
`
