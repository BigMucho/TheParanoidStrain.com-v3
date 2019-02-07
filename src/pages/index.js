import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout>
        <div className="container">
          <div className="columns">
            <div className="column posts">
              {posts.map(({ node: post }) => (
                <div className="post content columns is-variable is-8" key={post.id}>
                  <div className="post-img">
                    <img src={post.frontmatter.thumbnail} alt="" />
                  </div>
                  <div className="column">
                    <p>
                      <small>{post.frontmatter.date}</small>
                      <br />
                      <Link
                        className="has-text-primary titles is-size-2"
                        to={post.fields.slug}
                      >
                        {post.frontmatter.title}
                      </Link>
                    </p>
                    <p>
                      {post.excerpt}

                      <Link className="is-small" to={post.fields.slug}>
                        (read more)
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="column is-one-quarter sidebar" />
          </div>
        </div>
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
          excerpt(pruneLength: 300)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            thumbnail
          }
        }
      }
    }
  }
`;
