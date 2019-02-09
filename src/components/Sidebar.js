import React from "react";
import styled from "@emotion/styled";
import Vars from "../utils/globalVars.js";

const Styled = styled.div`
  flex: 0 1 300px;
  min-height: 300px;
  /* background-color: #ddd; */
  border-radius: 10px;
  border: 1px solid #ddd;
  @media screen and (max-width: ${Vars.breakpoint.xl}) {
    margin-top: calc(${Vars.spacer}*2);
  }
`;

class Sidebar extends React.Component {
  render() {
    return (
      <Styled>
        {this.props.children}
      </Styled>
    );
  }
}

export default Sidebar;
