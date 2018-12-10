import React from "react";
import PSlogo from "../img/ps-logo-long.png";
import Theme from "../utils/theme";
import styled from "@emotion/styled";

const LogoContainer = styled.div`
  width: 100vw;
  height: 100px;
  background-image: url(${PSlogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 20px 0px 20px 0px;
`;

const PStitle = () => <LogoContainer />;
export default PStitle;
