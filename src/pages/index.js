import React from "react";
import PropTypes from "prop-types";
import {  graphql } from "gatsby";
// import Image from "gatsby-image";

import Layout from "../components/Layout";
import MainSidebar from "../components/MainSidebar";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import PostPreview from "../components/PostPreview";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout>
        <MainSidebar>
          <Main>
            {posts.map(({ node: post }) => (
              <PostPreview
                key={post.id}
                imagePath={post.frontmatter.thumbnail.childImageSharp.fluid}
                date={post.frontmatter.date}
                link={post.fields.slug}
                title={post.frontmatter.title}
                excerpt={post.excerpt}
              />
            ))}
          </Main>
          <Sidebar />
        </MainSidebar>
      </Layout>
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
          excerpt(pruneLength: 160)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            thumbnail {
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
