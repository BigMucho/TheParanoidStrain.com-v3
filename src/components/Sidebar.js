import React from "react";
import styled from "@emotion/styled";

const Styled = styled.div`
  flex: 0 1 30%;
  min-height: 300px;
  background-color: #ddd;
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
