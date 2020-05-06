import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import Content, { HTMLContent } from "../components/Content";

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="posts__content">
        {posts &&
          posts.map(({ node: post }) => (
            <article
              key={post.id}
              className={`post__item ${
                post.frontmatter.featuredrecommendation ? "is-featured" : ""
              }`}
            >
              {post.frontmatter.bookcover ? (
                <div className="post__item-img">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: post.frontmatter.bookcover,
                      alt: `capa do post ${post.frontmatter.title}`
                    }}
                  />
                </div>
              ) : null}
              <div className="post__item-content">
                <p className="post__item-title">{post.frontmatter.title}</p>
                <HTMLContent content={post.html} />
              </div>
            </article>
          ))}
      </div>
    );
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              html
              frontmatter {
                templateKey
                date(formatString: "MMMM DD, YYYY")
                booktitle
                bookauthor
                bookyear
                bookcover {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                guestname
                guestbio
                guestpicture {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                recommendationsummary
                recommendationaudience
                featuredrecommendation
                tags
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
);
