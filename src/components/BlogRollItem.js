import React from "react";
import { Link } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import BackgroundImage from "gatsby-background-image";

class BlogRollItem extends React.Component {
  state = {
    open: true
  };

  componentDidMount() {
    if (this.props.open) {
      this.setState({ open: this.props.open });
    }
  }

  handlePostItemClick = () => {
    console.log("zzz click");
    this.setState({ open: !this.state.open });
  };

  render() {
    const { postData } = this.props;

    return (
      <article
        key={postData.id}
        className={`post ${
          postData.frontmatter.featuredrecommendation ? "post--featured" : ""
        } ${this.state.open ? "post--open" : ""}`}
        onClick={this.handlePostItemClick}
      >
        <div className="post__book">
          <div className="post__book-info">
            <p className="post__book-title">{postData.frontmatter.booktitle}</p>
            <p className="post__book-author">
              {postData.frontmatter.bookauthor}
            </p>
            <p className="post__book-year">{postData.frontmatter.bookyear}</p>
          </div>

          <div className="post__book-recommendation">
            <p className="post__book-summary">
              {postData.frontmatter.recommendationsummary}
            </p>
            <p className="post__book-audience">
              {postData.frontmatter.recommendationaudience}
            </p>
          </div>
        </div>

        <div className="post__images">
          {postData.frontmatter.guestpicture ? (
            <BackgroundImage
              Tag="div"
              className="post__images-guest"
              fluid={postData.frontmatter.guestpicture.childImageSharp.fluid}
              backgroundColor={`#000`}
            />
          ) : null}

          {postData.frontmatter.bookcover ? (
            <BackgroundImage
              Tag="div"
              className="post__images-book"
              fluid={postData.frontmatter.bookcover.childImageSharp.fluid}
              backgroundColor={`#000`}
            />
          ) : null}
        </div>

        <div className="post__guest">
          <p className="post__guest-name">{postData.frontmatter.guestname}</p>
          <p className="post__guest-bio">{postData.frontmatter.guestbio}</p>

          <Link className="post__link" to={postData.fields.slug}>
            read more
          </Link>
        </div>
      </article>
    );
  }
}

export default BlogRollItem;
