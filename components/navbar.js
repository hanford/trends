// @flow

import * as React from 'react'
import styled, { css } from 'react-emotion'
import { gridGap, maxWidth } from './style-constants'
import constants from '../helpers/constants'

const { times: timeOptions, languages: languageOptions, themes: themeOptions } = constants

type Props = {
  language: string,
  time: number
}

export default ({ language, time }: Props) => {
  const hasTheme = Object.entries(languageOptions).find(([_, value]) => value === language)
  const theme = hasTheme ? hasTheme[0] : false

  return (
    <Navbar theme={themeOptions[theme || 0]}>
      <Grid>
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

        <Container>
          <Link href='/graphiql' target='_blank' rel='noopener'>GraphQL API</Link>
          <Link href='https://github.com/hanford/trends' target='_blank' rel='noopener'>GitHub</Link>
        </Container>
      </Grid>
    </Navbar>
  )
}

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme};
  width: 100%;
  border-top: 1rem solid rgba(0,0,0,0.2);
  box-shadow: 0px 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 0px 2px 2px rgba(0, 0, 0, 0.098), 0px 0px 5px 1px rgba(0, 0, 0, 0.084);
  padding: 1rem 0;
`

const Grid = styled.div`
  max-width: ${maxWidth};
  margin: 0 auto;

  display: grid;
  grid-gap: ${gridGap};
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas:  'Form Form . GithubHeader';

  @media(max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:  'Form Form GithubHeader';
  }

  @media(max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:  'Form Form';
  }
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

  &:first-of-type {
    margin-right: 0.8rem;
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

    &:hover {
      background-color: rgba(255,255,255,0.3);
    }
  }
`

const Form = styled.form`
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-area: Form;
  grid-gap: ${gridGap};
  padding-left: ${gridGap};

  @media(max-width: 767px) {
    padding: 0 ${gridGap};
  }
`

const Container = styled.div`
  grid-area: GithubHeader;
  padding-right: 2rem;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: flex-end;

  @media(max-width: 767px) {
    display: none;
  }

  & > a:first-of-type {
    padding-right: 1.6rem;
  }
`

const Link = styled.a`
  color: rgba(255,255,255,0.9) !important;
  cursor: pointer;
  text-decoration: none;

`
