import * as React from "react";
import styled from "@emotion/styled";

import { Repo } from "../@types/graphql";
import Card from "../components/card";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { gridGap, maxWidth } from "../components/style-constants";
import getQueryData from "../helpers/query-data";

interface Props {
  children: React.ReactNode;
  language: string;
  time: number;
  dark: boolean;
  repos: Repo[];
}

function TrendsApp(props: Props) {
  const { time, language, dark, repos } = props;

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

export const config = {
  unstable_runtimeJS: false
};

TrendsApp.getInitialProps = async function(ctx: any) {
  const { query } = ctx;
  const { language, time, dark } = getQueryData(query);

  const endpoint =
    process.env.NODE_ENV === "production"
      ? `https://${ctx.req.headers.host}`
      : "http://localhost:2999";

  const res = await fetch(
    `${endpoint}/api/repos?language=${language}&time=${time}`
  );

  const data = await res.json();
  const repos = await data.items;

  return {
    time,
    language,
    dark,
    repos
  };
};

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
    background: #303030 !important;
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

export default TrendsApp;
