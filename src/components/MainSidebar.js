import React from "react";
import styled from "@emotion/styled";
import Vars from "../utils/globalVars.js";

const thisBreak = Vars.maxWidth;

const Styled = styled.div`
  padding-left: calc(${Vars.spacer} / 2);
  padding-right: calc(${Vars.spacer} / 2);

  @media screen and (min-width: ${thisBreak}) {
    display: flex;
    padding-left: calc((100% - ${thisBreak}) / 2);
    padding-right: calc((100% - ${thisBreak}) / 2);
    > :first-child {
      margin-right: ${Vars.spacer};
    }
  }
`;

class MainSidebar extends React.Component {
  render() {
    return <Styled>{this.props.children}</Styled>;
  }
}

export default MainSidebar;
