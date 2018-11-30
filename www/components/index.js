// @flow

import * as React from 'react';
import styled, { css } from 'react-emotion';

import { gridGap, maxWidth } from './style-constants';
import Card from './card';
import Navbar from './navbar';
import Footer from './footer';

type Props = {
  time: number,
  language: string,
  repos: Array<any>,
};

export default class Index extends React.Component<Props> {
  render() {
    const { time, language, repos = [] } = this.props;

    return (
      <Hero>
        <Navbar time={time} language={language} />

        <Row>
          {repos.length
            ? repos.map((repo, index) => <Card key={index} repo={repo} />)
            : 'Rate limit exceeded, try again in a moment'}
        </Row>

        <Footer />
      </Hero>
    );
  }
}

const Hero = styled.div`
  width: 100%;
  color: #333;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f4f3f4;
`;

const Row = styled.div`
  display: grid;
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
