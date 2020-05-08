import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import Content, { HTMLContent } from "../components/Content";
import BlogRollItem from "./BlogRollItem";

class BlogRoll extends React.Component {
  state = {
    openItems: []
  };

  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="posts__content">
        {posts &&
          posts.map(({ node: post }) => {
            const itemShouldBeOpen = this.state.openItems.includes(post.id);

            return (
              <BlogRollItem
                postData={post}
                key={post.id}
                open={itemShouldBeOpen}
              />
            );
          })}
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
