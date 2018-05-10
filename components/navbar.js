import styled, { css } from 'react-emotion'
import { Motion, spring, presets } from 'react-motion'
import Search from './search-icon'
import Loader from './loading-icon'

export default ({ setAndFetchTime, setAndFetchLanguage, repo, search, loading, getRepo, language, time, timeOptions, languageOptions, hideOnMobile = false }) => (
  <Navbar hideOnMobile={hideOnMobile}>
    <SearchBar>
      <IconSpace>
        {loading ? <Loader /> : <Search />}
      </IconSpace>

      <Form onSubmit={search}>
        <SearchInput
          placeholder='hanford/next-offline'
          type='search'
          onChange={getRepo('repo')}
          value={repo}
        />
      </Form>
    </SearchBar>

    <TuneContainer>
      <SelectContainer>
        <select onChange={event => setAndFetchLanguage(event.target.value)}>
          {Object.entries(languageOptions).map(([key, value]) => (
            <option selected={value === language} key={key} value={value}>{key}</option>
          ))}
        </select>
      </SelectContainer>
      <SelectContainer>
        <select onChange={event => setAndFetchTime(event.target.value)}>
          {Object.entries(timeOptions).map(([key, value]) => (
            <option selected={value === Number(time)} key={key} value={value}>{key}</option>
          ))}
        </select>
      </SelectContainer>
    </TuneContainer>
  </Navbar>
)

const Navbar = styled.div`
  width: 100%;
  max-width: 100%;
  position: sticky;
  top: 0;
  padding-top: 8px;
  z-index: 10;
  background-color: white;
  box-shadow: 0 10px 10px white;
  padding: 10px 0;

  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 8px;

  @media(max-width: 767px) {
    box-shadow: 0 -10px 10px white;
    bottom: 0;
    top: auto;
    grid-template-columns: 1fr;
  }

  @supports (-webkit-overflow-scrolling: touch) {
    backdrop-filter: blur(20px);
    background-color: rgba(255, 255, 255, 0.75);
  }

  /* iphoneX */
  @media only screen and (device-width : 375px) and (device-height : 812px) and (-webkit-device-pixel-ratio : 3) {
    padding-bottom: 20px;
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
    margin-right: 8px;
  }

  select {
    padding: 8px;
    font-size: 16px;
    -webkit-appearance: none;
    background-color: white;
    border-radius: 4px;
    border: 2px solid rgba(0,0,0,0.25);
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
    right: 8px;
  }
`

const TuneContainer = styled.div`
  display: flex;
  width: 100%;

  @media(max-width: 767px) {
    margin-top: 8px;
  }
`

const SearchInput = styled.input`
  -webkit-appearance: none;
  padding: 16px;
  border: 2px solid rgba(0,0,0,0.25);
  border-radius: 4px;
  font-size: 16px;

  width: 100%;
  padding-left: 54px;

  &:active,
  &:focus {
    border: 2px solid black;
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
  left: 8px;
  display: flex;
  height: 100%;
  align-items: center;
`
