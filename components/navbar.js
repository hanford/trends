import styled, { css } from 'react-emotion'
import { primary, gridGap, maxWidth } from './style-constants'

export default ({ language, time, timeOptions, languageOptions }) => (
  <Navbar>
    <Form label='search' name='tune' method='GET'>
      <SelectContainer htmlFor='language'>
        <Label>Language</Label>

        <select aria-label='select language' name='language' id='language'>
          {Object.entries(languageOptions).map(([key, value]) => (
            <option selected={value === language} key={key} value={value}>{key}</option>
          ))}
        </select>
      </SelectContainer>
      <SelectContainer htmlFor='time'>
        <Label>Time</Label>

        <select aria-label='select time' name='time' id='time'>
          {Object.entries(timeOptions).map(([key, value]) => (
            <option selected={value === Number(time)} key={key} value={value}>{key}</option>
          ))}
        </select>
      </SelectContainer>
    </Form>
  </Navbar>
)

const Navbar = styled.nav`
  width: 100%;
  position: sticky;
  top: 0;
  padding-top: 0.8rem;
  z-index: 10;
  background-color: ${primary};
  box-shadow: 0 1rem 1rem ${primary};

  @media(max-width: 767px) {
    box-shadow: 0 -1rem 1rem ${primary};
    bottom: 0;
    top: auto;
    padding-bottom: 1rem;
  }

  /* iPhone X */
  @media only screen and (device-width : 375px) and (device-height : 812px) and (-webkit-device-pixel-ratio : 3) {
    padding-bottom: 2rem;
  }
`

const Label = styled.span`
  position: absolute;
  top: 0.5rem;
  font-size: 1rem;
  left: 0.8rem;
`

const SelectContainer = styled.label`
  width: 100%;
  cursor: pointer;
  position: relative;
  ${'' /* box-shadow: 0 0 3rem rgba(0,0,0,0.25); */}
  cursor: pointer;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0,0,0,0.2);

  &:first-of-type {
    margin-right: 0.8rem;
  }

  label {
    @media(max-width: 767px) {
      width: 100%;
    }
  }

  select {
    padding: 0.8rem;
    padding-top: 2rem;
    font-size: 1.6rem;
    -webkit-appearance: none;
    background-color: white;
    height: 4.8rem;
    border: none;
    width: 100%;
    cursor: pointer;
  }

  &::before {
    content: '▼';
    position: absolute;
    pointer-events: none;
    right: 0;
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 12px;
    right: 0.8rem;
  }
`

const Form = styled.form`
  width: 100%;
  position: relative;

  padding: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: ${gridGap};
  padding: 0 ${gridGap};
  max-width: ${maxWidth};
  margin: 0 auto;

  @media(max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`
