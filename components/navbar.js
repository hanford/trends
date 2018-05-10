import styled, { css } from 'react-emotion'
import { Motion, spring, presets } from 'react-motion'

import Search from './search-icon'
import Loader from './loading-icon'

export default ({ setAndFetchTime, setAndFetchLanguage, repo, search, loading, getRepo, language, time, timeOptions, languageOptions }) => (
  <Navbar>
    {/* onSubmit={search} */}
    <Form label='search' name='tune' method="GET">
      {/* <SearchBar>
        <IconSpace>
          {loading ? <Loader /> : <Search />}
        </IconSpace>

        <SearchContainer>
          <SearchInput
            placeholder='hanford/next-offline'
            type='search'
            onChange={getRepo('repo')}
            value={repo}
            aria-label='user search'
          />
        </SearchContainer>
      </SearchBar> */}

      <TuneContainer>
        <SelectContainer>
          <select aria-label='select language' name='language' onchange='this.form.submit()'>
          {/*  onChange={event => setAndFetchLanguage(event.target.value)} */}
            {Object.entries(languageOptions).map(([key, value]) => (
              <option selected={value === language} key={key} value={value}>{key}</option>
            ))}
          </select>
        </SelectContainer>
        <SelectContainer>
          <select aria-label='select time' name='time' onchange='this.form.submit()'>
          {/*  onChange={event => setAndFetchTime(event.target.value)} */}
            {Object.entries(timeOptions).map(([key, value]) => (
              <option selected={value === Number(time)} key={key} value={value}>{key}</option>
            ))}
          </select>
        </SelectContainer>
      </TuneContainer>
    </Form>
  </Navbar>
)

const Navbar = styled.div`
  width: 100%;
  max-width: 100%;
  position: sticky;
  top: 0;
  padding-top: 0.8rem;
  z-index: 10;
  background-color: white;
  box-shadow: 0 1rem 1rem white;
  padding: 1rem 0;

  @media(max-width: 767px) {
    box-shadow: 0 -1rem 1rem white;
    bottom: 0;
    top: auto;
    grid-template-columns: 1fr;
  }

  @supports (-webkit-overflow-scrolling: touch) {
    backdrop-filter: blur(2rem);
    background-color: rgba(255, 255, 255, 0.75);
  }

  /* iphoneX */
  @media only screen and (device-width : 375px) and (device-height : 812px) and (-webkit-device-pixel-ratio : 3) {
    padding-bottom: 2rem;
  }
`

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`

const SelectContainer = styled.div`
  width: 100%;
  cursor: pointer;
  display: grid;
  position: relative;

  &:first-of-type {
    margin-right: 0.8rem;
  }

  select {
    padding: 0.8rem;
    font-size: 1.6rem;
    -webkit-appearance: none;
    background-color: white;
    border-radius: 0.4rem;
    border: 0.2rem solid rgba(0,0,0,0.25);
    cursor: pointer;

    @media(max-width: 767px) {
      width: 100%;
    }
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

const TuneContainer = styled.div`
  display: flex;
  width: 100%;

  @media(max-width: 767px) {
    margin-top: 0.8rem;
  }
`

const SearchInput = styled.input`
  -webkit-appearance: none;
  padding: 1.6rem;
  border: 0.2rem solid rgba(0,0,0,0.25);
  border-radius: 0.4rem;
  font-size: 1.6rem;

  width: 100%;
  padding-left: 54px;

  &:active,
  &:focus {
    border: 0.2rem solid black;
    outline: none;
  }

  &:before {
    content: '';
  }

  @media(max-width: 767px) {
    width: 100%;
  }
`

const Form = styled.form`
  width: 100%;
  position: relative;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 0.8rem;

    @media(max-width: 767px) {
    grid-template-columns: 1fr;
  }
`

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media(max-width: 767px) {
    flex-direction: column;
  }
`

const IconSpace = styled.div`
  position: absolute;
  left: 0.8rem;
  display: flex;
  height: 100%;
  align-items: center;
`
