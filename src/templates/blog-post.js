import { React } from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link, withPrefix } from "gatsby";
import { Tween } from "react-gsap";
import Image from "gatsby-image";

import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import styled from "@emotion/styled";
import Vars from "../utils/globalVars.js";

const Styled = styled.div`
  /* display: flex;
  flex-direction: column;
  > * {
    flex: 0 1 auto;
  } */

  .date {
    color: ${Vars.color.lightGray};
    font-size: 20px;
    text-transform: uppercase;
    margin: 0px;
  }
  .title {
    @media screen and (min-width: ${Vars.breakpoint.md}) {
      font-size: 66px;
    }
  }
  .anim {
    position: relative;
    overflow: hidden;
    background-color: black;
    display: flex;

    .blinds {
      flex: 0 1 auto;
      z-index: 10;
      img {
        display: block;
        width: 100%;
        height: auto;
        margin: 0px;
      }
    }
    .shadow {
      flex: 0 1 auto;
      z-index: 5;

      img {
        position: absolute;
        display: block;
        width: 100%;
        height: auto;
        margin: 0px;
        opacity: 0.6;
        filter: blur(3px);
      }
    }
    .epImg {
      flex: 0 1 auto;
      
      position: absolute;
      width: 100%;
      height: 100%;
      .img {
        position: absolute;
        /* display: block; */
        width: 40%;
        height: auto;
        left: 45%;
        top: 2.5%;
        margin: 0px;
      }
    }
  }
`;

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  date,
  helmet,
  posterImage

}) => {
  const PostContent = contentComponent || Content;

  return (
    <Styled className="section">
      {helmet || ""}
      <p className="date">{date}</p>
      <h1 className="title depressionist">{title}</h1>
      
      <div className="anim">
        <Tween from={{ opacity: 0, y: "30%", delay: 0.5}} duration={4}>
          <div className="epImg">
            
            <Image className="img" fluid={posterImage} />
          </div>
        </Tween>
        <div className="shadow">
          <img src={withPrefix("/img/blinds-shadow.png")} alt="meh" />
        </div>
        <div className="blinds">
          <img src={withPrefix("/img/blinds-hands.png")} alt="meh" />
        </div>
      </div>

      <p>{description}</p>
      <PostContent content={content} />
      {tags && tags.length ? (
        <div style={{ marginTop: `4rem` }}>
          <h4>
            <strong>Tags</strong>
          </h4>
          <ul className="taglist">
            {tags.map(tag => (
              <li key={tag + `tag`}>
                <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Styled>
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        date={post.frontmatter.date}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        posterImage={post.frontmatter.posterImage.childImageSharp.fluid}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        posterImage {
          childImageSharp {
            fluid(maxWidth: 600, quality: 90) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
