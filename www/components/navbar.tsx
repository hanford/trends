import React from "react";
import styled from "react-emotion";
import {
  languages as languageOptions,
  themes as themeOptions,
  times as timeOptions
} from "../helpers/constants";
import { gridGap, maxWidth } from "./style-constants";

interface Props {
  language: string;
  time: number;
  dark: boolean;
}

export default ({ language, time, dark }: Props) => {
  const hasTheme = Object.entries(languageOptions).find(
    ([_, value]) => value === language
  );

  const theme = hasTheme ? hasTheme[0] : false;

  return (
    <Navbar theme={themeOptions[theme || 0]}>
      <Grid>
        <Form aria-label="search" name="tune" method="GET">
          <SelectContainer htmlFor="language">
            <Label>Language</Label>

            <select
              aria-label="select language"
              name="language"
              id="language"
              defaultValue={language}
            >
              {Object.entries(languageOptions).map(([key, value]) => (
                <Option key={key} value={value}>
                  {key}
                </Option>
              ))}
            </select>
          </SelectContainer>

          <SelectContainer htmlFor="time">
            <Label>Time</Label>

            <select
              aria-label="select time"
              name="time"
              id="time"
              defaultValue={String(time)}
            >
              {Object.entries(timeOptions).map(([key, value]) => (
                <Option key={key} value={value}>
                  {key}
                </Option>
              ))}
            </select>
          </SelectContainer>
        </Form>
        <Container>
          <a href={`?dark=${!dark}`}>
            <Moon />
          </a>

          <Link
            href="https://github.com/hanford/trends"
            target="_blank"
            rel="noopener"
          >
            GitHub
          </Link>
        </Container>
      </Grid>
    </Navbar>
  );
};

const Moon = () => (
  <MoonIcon version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
    <path
      d="M35.143 11C19.81 16.682 11 31.448 11 48.757 11 70.983 29.017 89 51.243 89 68.55 89 83.318 80.19 89 64.857c-4.583 1.843-9.585 2.786-14.828 2.786-21.967 0-41.815-19.848-41.815-41.815 0-5.243.943-10.245 2.786-14.828z"
      style={{ color: "#000000" }}
      fill="#FFF"
      marker="none"
      visibility="visible"
      display="inline"
      overflow="visible"
    />
  </MoonIcon>
);

const MoonIcon = styled.svg`
  height: 20px;
  width: 20px;
  margin-right: 10px;
  fill: white;
`;

const Option = styled.option`
  color: black;
`;

const Navbar = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  border-top: 1rem solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 -13px 27px -5px rgba(50, 50, 93, 0.25),
    0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
  padding: 1rem 0;
  background-color: ${({ theme }) => theme};

  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background-color: ${({ theme }) => theme}95;
    border-top: 0 transparent;
  }

  /* detect if launched from homescreen */
  @media all and (display-mode: standalone) {
    border-top: 0;
  }

  @media (max-width: 767px) {
    box-shadow: 0 -13px 27px -5px rgba(50, 50, 93, 0.25),
      0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.025);
    top: auto;
    bottom: 0;
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
    border-top: 0;
  }
`;

const Grid = styled.div`
  max-width: ${maxWidth};
  margin: 0 auto;

  display: grid;
  grid-gap: ${gridGap};
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-areas: "Form Form . GithubHeader";

  @media (max-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "Form Form GithubHeader";
  }

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-areas: "Form Form";
  }
`;

const Label = styled.span`
  position: absolute;
  top: 0.5rem;
  font-size: 1rem;
  left: 0.8rem;
  color: white;
`;

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
    @media (max-width: 767px) {
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
    background-color: rgba(255, 255, 255, 0.2);
    width: 100%;
    cursor: pointer;
    color: white;
    border-radius: 0.2rem;

    &:hover {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

const Form = styled.form`
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-area: Form;
  grid-gap: ${gridGap};
  padding-left: ${gridGap};

  @media (max-width: 767px) {
    padding: 0 ${gridGap};
    grid-template-columns: 1fr;
  }
`;

const Container = styled.div`
  grid-area: GithubHeader;
  padding-right: 2rem;
  justify-content: center;
  align-items: center;
  display: flex;
  justify-content: flex-end;

  @media (max-width: 767px) {
    display: none;
  }

  & > a:first-of-type {
    padding-right: 1.6rem;
  }
`;

const Link = styled.a`
  color: rgba(255, 255, 255, 0.9) !important;
  cursor: pointer;
  text-decoration: none;
`;
