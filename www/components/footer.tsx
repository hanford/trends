import React from "react";
import styled from "@emotion/styled";

export default ({ dark }: { dark: boolean }) => (
  <Footer>
    <a
      href="https://github.com/hanford/trends"
      rel="noopener"
      target="_blank"
      style={{
        color: dark ? "rgba(255, 255, 255, 0.75);" : "rgba(0, 0, 0, 0.9)"
      }}
    >
      View source code
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
    margin-right: 1rem;

    @media (prefers-color-scheme: dark) {
      color: rgba(255, 255, 255, 0.75) !important;
    }
  }
`;
