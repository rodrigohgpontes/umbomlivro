import React from "react";
import { Link } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import BackgroundImage from "gatsby-background-image";

class BlogRollItem extends React.Component {
  state = {
    open: false
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
            {postData.frontmatter.bookcover ? (
              <BackgroundImage
                Tag="div"
                className="post__book-cover"
                fluid={postData.frontmatter.bookcover.childImageSharp.fluid}
                backgroundColor={`#000`}
              />
            ) : null}

            <div className="post__book-details">
              <p className="post__book-title">
                {postData.frontmatter.booktitle}
              </p>
              <p className="post__book-author">
                {postData.frontmatter.bookauthor}
              </p>
              <p className="post__book-year">{postData.frontmatter.bookyear}</p>
            </div>
          </div>

          <div className="post__book-recommendation">
            <p className="post__book-summary">
              <strong>Em suma</strong>{" "}
              {postData.frontmatter.recommendationsummary}
            </p>
            <p className="post__book-audience">
              <strong>Bom pra quem</strong>{" "}
              {postData.frontmatter.recommendationaudience}
            </p>
          </div>
        </div>

        <div className="post__images">
          <div className="post__images-plus-sign">+</div>
          {postData.frontmatter.bookcover ? (
            <BackgroundImage
              Tag="div"
              className="post__images-book"
              fluid={postData.frontmatter.bookcover.childImageSharp.fluid}
              backgroundColor={`#000`}
            />
          ) : null}

          {postData.frontmatter.guestpicture ? (
            <BackgroundImage
              Tag="div"
              className="post__images-guest"
              fluid={postData.frontmatter.guestpicture.childImageSharp.fluid}
              backgroundColor={`#000`}
            />
          ) : null}
        </div>

        <div className="post__guest">
          <div className="post__guest-details">
            <p className="post__guest-name">{postData.frontmatter.guestname}</p>
            <p className="post__guest-bio">{postData.frontmatter.guestbio}</p>
          </div>

          {postData.frontmatter.guestpicture ? (
            <BackgroundImage
              Tag="div"
              className="post__guest-picture"
              fluid={postData.frontmatter.guestpicture.childImageSharp.fluid}
              backgroundColor={`#000`}
            />
          ) : null}
        </div>

        <Link className="post__link" to={postData.fields.slug}>
          Leia a entrevista completa{"    "}
          <svg
            class="post__link-arrow"
            width="54"
            height="15"
            viewBox="0 0 54 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              fill-rule="nonzero"
              stroke="#a32a99"
              fill="none"
              stroke-linecap="square"
            >
              <path d="M.5 7h51.919M46 0l7 7.147L46 14"></path>
            </g>
          </svg>
        </Link>
      </article>
    );
  }
}

export default BlogRollItem;
