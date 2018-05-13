import styled, { css } from 'react-emotion'

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
  max-width: 100%;
  position: sticky;
  top: 0;
  padding-top: 0.8rem;
  z-index: 10;
  background-color: white;
  box-shadow: 0 1rem 1rem white;
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;

  @media(max-width: 767px) {
    box-shadow: 0 -1rem 1rem white;
    bottom: 0;
    top: auto;
    grid-template-columns: 1fr;
  }

  /* iPhone X */
  @media only screen and (device-width : 375px) and (device-height : 812px) and (-webkit-device-pixel-ratio : 3) {
    padding-bottom: 2rem;
  }
`

const Label = styled.span`
  position: absolute;
  top: 0;
  font-size: 1.2rem;
  left: 0.8rem;
`

const SelectContainer = styled.label`
  width: 100%;
  cursor: pointer;
  position: relative;
  border-bottom: 0.1rem solid rgba(0,0,0,0.25);
  cursor: pointer;
  display: flex;
  align-items: center;

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

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.8rem;
`
