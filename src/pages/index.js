import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
// import Image from "gatsby-image";
import styled from "@emotion/styled";
import Layout from "../components/Layout";
import MainSidebar from "../components/MainSidebar";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import PostPreview from "../components/PostPreview";

const Styled = styled.div`
  margin-bottom: 200px;
`;

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Styled>
        <Layout>
          <MainSidebar>
            <Main>
              {posts.map(({ node: post }) => (
                <PostPreview
                  key={post.id}
                  imagePath={post.frontmatter.teaserImage.childImageSharp.fluid}
                  date={post.frontmatter.date}
                  link={post.fields.slug}
                  title={post.frontmatter.title}
                  excerpt={post.excerpt}
                  tags={post.frontmatter.tags}
                />
              ))}
            </Main>
            <Sidebar />
          </MainSidebar>
        </Layout>
      </Styled>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            tags
            teaserImage {
              childImageSharp {
                fluid(maxWidth: 600, quality: 90) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
