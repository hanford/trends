import React from "react";
import styled from "react-emotion";
import { Repo } from "../@types/graphql";
import Card from "./card";
import Footer from "./footer";
import Navbar from "./navbar";
import { gridGap, maxWidth } from "./style-constants";

interface Props {
  time: number;
  language: string;
  dark: boolean;
  repos: Repo[];
}

export default class Index extends React.Component<Props> {
  render() {
    const { time, language, repos = [], dark } = this.props;

    return (
      <Hero style={{ backgroundColor: dark ? "#303030" : "#f4f3f4" }}>
        <Navbar time={time} language={language} dark={dark} />

        <Container>
          <Row>
            {repos.length > 0
              ? repos.map((r, i) => <Card key={i} repo={r} dark={dark} />)
              : "Rate limit exceeded, try again in a moment"}
          </Row>

          <Footer dark={dark} />
        </Container>
      </Hero>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Hero = styled.div`
  width: 100%;
  color: #333;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  @media (prefers-color-scheme: dark) {
    background: #303030;
  }

  @media (max-width: 767px) {
    flex-direction: column-reverse;
  }
`;

const Row = styled.div`
  display: grid;
  margin: 2rem auto;
  grid-template-columns: repeat(
    auto-fit,
    minmax(calc(30rem - ${gridGap}), 1fr)
  );
  grid-gap: ${gridGap};
  padding: 0 ${gridGap};
  padding-bottom: 5rem;
  width: 100%;
  margin-top: 2rem;
  max-width: ${maxWidth};

  @media (max-width: 767px) {
    margin-top: 0;
    padding: ${gridGap};
  }
`;
