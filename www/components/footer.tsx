import React from "react";
import styled from "react-emotion";

export default () => (
  <Footer>
    <a href="https://jackhanford.com" rel="noopener" target="_blank">
      Made by Jack Hanford 👨‍💻
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

    @media (prefers-color-scheme: dark) {
      color: rgba(255, 255, 255, 0.75);
    }
  }
`;
