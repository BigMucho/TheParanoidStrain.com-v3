import React from "react";
import styled from "@emotion/styled";

const Styled = styled.div`
  flex: 1;
`;

class Main extends React.Component {
  render() {
    return (
      <Styled>
        {this.props.children}
      </Styled>
    );
  }
}

export default Main;