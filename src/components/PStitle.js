import React from "react";
import styled from "@emotion/styled";
import Vars from "../utils/globalVars.js";
import PSlogo from "../img/ps-logo-long.png";

const thisBreak = Vars.maxWidth;

const Styled = styled.div`
  margin-top: calc(${Vars.spacer} / 2);
  padding-left: calc(${Vars.spacer} / 2);
  padding-right: calc(${Vars.spacer} / 2);

  @media screen and (min-width: ${thisBreak}) {
    padding-left: calc((100% - ${thisBreak}) / 2);
    padding-right: calc((100% - ${thisBreak}) / 2);
  }
  img {
    margin-bottom: 0;
  }
`;

const PStitle = class extends React.Component {
  render() {
    return (
      <Styled>
        <img src={PSlogo} alt="The Paranoid Strain" />
      </Styled>
    );
  }
};
export default PStitle;
