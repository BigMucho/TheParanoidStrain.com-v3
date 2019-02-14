import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import Image from "gatsby-image";
import Vars from "../utils/globalVars.js";
import { kebabCase } from "lodash";
import IconTags from "../img/tags.svg";

const thisBreak = Vars.breakpoint.lg;
const Styled = styled.div`
  @media screen and (min-width: ${thisBreak}) {
    display: flex;
  }

  transition: opacity 0.5;

  &:hover > .image {
    opacity: 1;
  }

  &:not(:last-child) {
    margin-bottom: calc(${Vars.spacer} * 2);
    @media screen and (min-width: ${thisBreak}) {
      margin-bottom: ${Vars.spacer};
    }
  }
  .image {
    flex: 0 0 260px;
    @media screen and (min-width: ${thisBreak}) {
      opacity: 0.8;
    }

    transition: all 0.33s;
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
        color: ${Vars.color.lightGray};
        font-size: 0.9rem;
        text-transform: uppercase;
        margin-bottom: 3px;
        @media screen and (max-width: ${Vars.breakpoint.lg}) {
          margin-top: 20px;
        }
      }
      &:nth-child(2) {
        /* color: #777; */
        margin-bottom: 10px;
      }
    }
    .tags {
      margin-top: 7px;
      color: ${Vars.color.lightGray};
      font-size: 0.9rem;
      a {
        color: ${Vars.color.lightGray} !important;
        &:hover {
          color: ${Vars.color.main} !important;
        }
      }
      .icon {
        opacity: 0.8;
      }

      > * {
        &:not(:last-child):after {
          content: ", ";
        }
        &:first-child {
          margin-right: 5px;
        }
      }
    }
    .icon {
      fill: ${Vars.color.lightGray};
      width: 16px;
    }
  }
`;

class PostPreview extends React.Component {
  render() {
    return (
      <Styled>
        <Link className="image" to={this.props.link}>
          <Image fluid={this.props.imagePath} />
        </Link>
        <div className="copy">
          <p>{this.props.date}</p>
          <Link to={this.props.link}>
            <h1 className="depressionist">{this.props.title}</h1>
          </Link>
          <p>
            {this.props.excerpt} <Link to={this.props.link}> (read more)</Link>
          </p>
          <p className="tags">
          <IconTags className="icon"/>
            {this.props.tags.map(tag => (
              <span key={tag + `tag`}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </span>
            ))}
          </p>
        </div>
      </Styled>
    );
  }
}

export default PostPreview;
