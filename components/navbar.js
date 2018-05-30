import styled, { css } from 'react-emotion'
import { gridGap, maxWidth } from './style-constants'

export default ({ language, time, timeOptions, languageOptions, theme }) => (
  <Navbar theme={theme}>
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
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme};
  width: 100%;
  border-top: 1rem solid rgba(0,0,0,0.2);
  box-shadow: 0 0 4px rgba(0,0,0,.14), 0 4px 8px rgba(0,0,0,.28);
  padding: 1rem 0;
`

const Label = styled.span`
  position: absolute;
  top: 0.5rem;
  font-size: 1rem;
  left: 0.8rem;
  color: white;
`

const SelectContainer = styled.label`
  width: 100%;
  cursor: pointer;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: 0.85;

  &:hover {
    opacity: 1;
  }

  &:first-of-type {
    margin-right: 0.8rem;
  }

  @media(max-width: 767px) {
    opacity: 1;
  }

  label {
    color: white;
    @media(max-width: 767px) {
      width: 100%;
    }
  }

  select {
    padding: 0.8rem;
    outline: none;
    padding-top: 2rem;
    font-size: 1.6rem;
    -webkit-appearance: none;
    height: 4.8rem;
    border: none;
    background-color: rgba(255,255,255,0.2);
    width: 100%;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;
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
