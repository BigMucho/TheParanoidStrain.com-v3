import React from "react";
// import Image from "gatsby-image";
import PSlogo from "../img/ps-logo-long.png";

const PStitle = class extends React.Component {
  render() {
    return (
      <div className="pstitle">
        <img className="img" src={PSlogo} alt="The Paranoid Strain" />
      </div>
    );
  }
};
export default PStitle;
