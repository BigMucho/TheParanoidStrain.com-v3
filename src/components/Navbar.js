import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import Vars from "../utils/globalVars.js";

const thisBreak = Vars.breakpoint.lg;

const Styled = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${Vars.spacer};

  > * {
    text-transform: uppercase;
    color: #de222c;
    margin: 0;
    font-size: 1.2rem;
    letter-spacing: -1px;
    flex: 0 1 auto;
    &:not(:last-child) {
      margin-right: calc(${Vars.spacer});
    }
  }
`;

class NavBar extends React.Component {
  render() {
    return (
      <Styled>
        <Link>
          <strong>Home</strong>
        </Link>
        <Link>
          <strong>Episodes</strong>
        </Link>
        <Link>
          <strong>About Us</strong>
        </Link>
        <Link>
          <strong>Subscribe</strong>
        </Link>
      </Styled>
    );
  }
}

export default NavBar;
