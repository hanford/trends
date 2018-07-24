// @flow

import * as React from 'react';
import styled from 'react-emotion';

export default () => (
  <Footer>
    <a href="https://jackhanford.com" rel="noopener" target="_blank">
      made by Jack Hanford 👨‍💻
    </a>
  </Footer>
);

const Footer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 4rem;

  a {
    text-decoration: none;
    color: rgba(0, 0, 0, 0.9);
  }
`;
