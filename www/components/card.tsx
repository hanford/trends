import React from "react";
import styled from "react-emotion";
import { Repo } from "../@types/graphql";

interface Props {
  repo: Repo;
}

export default class extends React.Component<Props> {
  render() {
    const {
      repo: { name, forks, full_name, description, stargazers_count }
    } = this.props;

    return (
      <Card
        href={`https://github.com/${full_name}`}
        target="_blank"
        rel="noopener"
      >
        <About>
          <div>
            <Name>{name}</Name>
            <Secondary>{full_name}</Secondary>
          </div>

          <Description>{description}</Description>

          <Bottom>
            <Fork>Forks {forks}</Fork>
            <Stars>Stars {stargazers_count}</Stars>
          </Bottom>
        </About>
      </Card>
    );
  }
}

const Card = styled.a`
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border-radius: 0.4rem;
  background-color: white;
  position: relative;
  text-decoration: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  transition: all 135ms cubic-bezier(0.4, 0, 0.2, 1);

  @media (min-width: 767px) {
    &:hover {
      transform: scale(1.0125);
      box-shadow: 0 0.5rem 2rem 0 rgba(60, 64, 67, 0.2);
    }
  }
`;

const Fork = styled.div`
  padding: 0.4rem 0.8rem;
  background: rgba(0, 0, 0, 0.05);
  color: rgba(0, 0, 0, 0.9);
  font-size: 1.4rem;
  border-top-left-radius: 0.4rem;
`;

const Stars = styled.div`
  padding: 0.4rem 0.8rem;
  background: #fff59d;
  color: black;
  font-size: 1.4rem;
`;

const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
`;

const About = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
`;

const Name = styled.h1`
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  max-width: 100%;

  font-size: 2.4rem;
  color: rgba(0, 0, 0, 0.87);
  display: block;
`;

const Description = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 1.6rem;
  margin: 0;
  color: rgba(0, 0, 0, 0.87);
  padding-bottom: 1.6rem;
`;

const Secondary = styled.h3`
  font-weight: normal;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.54);
  display: block;
  padding: 0.8rem 0 1.6rem;
`;
