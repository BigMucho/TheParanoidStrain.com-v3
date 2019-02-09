import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import Image from "gatsby-image";
import Vars from "../utils/globalVars.js";

const thisBreak = Vars.breakpoint.lg;
const Styled = styled.div`
  @media screen and (min-width: ${thisBreak}) {
    display: flex;
  }

  &:not(:last-child) {
    margin-bottom: calc(${Vars.spacer} * 2);
    @media screen and (min-width: ${thisBreak}) {
      margin-bottom: ${Vars.spacer};
    }
  }
  .image {
    flex: 0 0 240px;
    display: flex;
    justify-content: center;
    border-radius: 10px;
    overflow: hidden;
    @media screen and (min-width: ${thisBreak}) {
      margin-right: ${Vars.spacer};
    }
    * {
      flex: 1;
    }
  }
  .copy {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: $standard-pad / 2;

    * {
      margin: 0;
      flex: 0 1 auto;
    }
    > * {
      &:nth-child(1) {
        color: #999;
        font-size: 0.9rem;
        text-transform: uppercase;
        /* margin-bottom: 3px; */
        @media screen and (max-width: ${Vars.breakpoint.lg}) {
            margin-top: 20px;
        }
      }
      &:nth-child(2) {
        /* color: #777; */
        margin-bottom: 10px;
      }
    }
  }
`;

class PostPreview extends React.Component {
  render() {
    return (
      <Styled>
        <div className="image">
          <Image fluid={this.props.imagePath} />
        </div>
        <div className="copy">
          <p>{this.props.date}</p>
          <Link to={this.props.link}>
            <h1 className="depressionist">{this.props.title}</h1>
          </Link>
          <p>
            {this.props.excerpt} <Link to={this.props.link}> (read more)</Link>
          </p>
        </div>
      </Styled>
    );
  }
}

export default PostPreview;
