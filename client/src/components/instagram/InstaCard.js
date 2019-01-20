import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import uuid from "uuid";
import moment from "moment";
import sprite from "../../assets/smallerSprite.png";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input
} from "reactstrap";
import {
  addInstaComments,
  deleteInstaComment
} from "../../store/action/instaCommentAction";

const InstaCardStyle = styled.div`
  margin-top: 80px;
  .comment_icons {
    cursor: pointer;
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    .first_icon_item {
      display: flex;
      justify-content: space-between;
    }
    /* Icons Active */
    .comment_icons_heart_red {
      background-repeat: no-repeat;
      background-position: -78px -142px;
      height: 24px;
      width: 24px;
      margin-right: 13px;
    }
    .comment_icons_heart {
      background-position: -104px -142px;
      background-repeat: no-repeat;
      height: 24px;
      width: 24px;
      margin-right: 13px;
    }
    .comment_icon_message {
      background-repeat: no-repeat;
      height: 24px;
      width: 24px;
      background-position: -182px -194px;
      margin-right: 13px;
    }
    .comment_icons_share {
      background-repeat: no-repeat;
      height: 24px;
      width: 24px;
      background-position: -130px -194px;
      margin-right: 13px;
    }
    .comment_icons_bookmark {
      ackground-repeat: no-repeat;
      background-position: 0 -194px;
      height: 24px;
      width: 24px;
    }
  }
  .input_comment[type="placeholder"] {
    padding: 100px auto;
  }

  .delete_btn {
  }
  .input_comment {
    font-size: 14px;
    color: #8f8f8f;
    border: none;
    border-top: 1px solid #e8e8e8;
    padding: 30px;
    min-width: 90%;
    max-width: 350px;
    /* max-width: 550px; */
    padding-left: 0;
    margin: 0 auto;
    &:focus {
      border-color: #e8e8e8;
      -webkit-box-shadow: none;
      box-shadow: none;
    }
  }
  .comment_timestamp {
    font-size: 12px;
    color: #c4c4c4;
    margin-left: 15px;
  }
`;
class InstaCard extends Component {
  state = {
    message: "",
    heart: false
  };

  addComment = (e, username) => {
    e.preventDefault();
    if (!this.state.message) return;
    const newComments = this.props.instagram;
    const postComments = {
      text: this.state.message,
      username: this.props.name,
      commentId: uuid(),
      updatedAt: new Date(),
      createdAt: new Date()
    };
    newComments.map(comment =>
      comment.username === username ? comment.comments.push(postComments) : null
    );
    this.props.addInstaComments(username, newComments, postComments);
    this.setState({ message: "" });
  };
  deleteComment = (commentId, username) => {
    this.props.deleteInstaComment(commentId, username);
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  toggleHeart = () => {
    this.setState((state, props) => {
      return { heart: !state.heart };
    });
  };

  render() {
    const {
      item: { imageUrl, username, likes, timestamp, thumbnailUrl, comments }
    } = this.props;
    return (
      <InstaCardStyle>
        <Card
          style={{
            marginBottom: 70
          }}
        >
          <CardTitle
            style={{
              padding: "15px 10px 0 10px"
            }}
          >
            <img
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                marginRight: 8
              }}
              src={thumbnailUrl}
              alt="comment text"
            />
            {username}
          </CardTitle>
          <CardImg
            top
            src={imageUrl}
            alt="Card image cap"
            style={{
              objectFit: "cover",
              maxWidth: "100%"
            }}
          />

          <CardBody>
            {/* Icons */}
            <div className="comment_icons">
              <div className="flex_icon_item first_icon_item">
                <div
                  className={
                    this.state.heart
                      ? "comment_icons_heart"
                      : "comment_icons_heart_red"
                  }
                  style={{
                    backgroundImage: `url(${sprite})`
                  }}
                  onClick={this.toggleHeart}
                />
                <div
                  className="comment_icon_message"
                  style={{
                    backgroundImage: `url(${sprite})`
                  }}
                />
                <div
                  className="comment_icons_share"
                  style={{
                    backgroundImage: `url(${sprite})`
                  }}
                />
              </div>
              <div className="flex_icon_item">
                <div
                  className="comment_icons_bookmark"
                  style={{
                    backgroundImage: `url(${sprite})`
                  }}
                />
              </div>
            </div>
            <CardSubtitle
              style={{
                fontWeight: "bold",
                margin: "4px 0 10px 0"
              }}
            >
              {this.state.heart ? likes + 1 : likes} likes
            </CardSubtitle>

            {comments.map((comment, index) => (
              <CardText
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "6px 0"
                }}
              >
                <span>
                  <span style={{ fontWeight: "bold", marginRight: 5 }}>
                    {comment.username}
                  </span>
                  <span>{comment.text}</span>
                  <span className="comment_timestamp">
                    {!comment.updatedAt
                      ? null
                      : moment(comment.updatedAt).fromNow()}
                  </span>
                </span>
                <span>
                  {/* {!comment.commentId ? (
                    ""
                  ) : (
                    <Button
                      outline
                      color="secondary"
                      className="delete_btn"
                      style={{ fontSize: 12, bordzerRadius: "90%" }}
                      onClick={() =>
                        this.deleteComment(comment.commentId, username)
                      }
                    >
                      X
                    </Button>
                  )} */}
                </span>
              </CardText>
            ))}

            <span
              style={{
                fontSize: 12,
                color: "gray"
              }}
            >
              {moment(timestamp).fromNow()}
            </span>
          </CardBody>
          <form onSubmit={e => this.addComment(e, username)}>
            <Input
              type="text"
              name="message"
              onChange={this.handleChange}
              value={this.state.message}
              className="input_comment"
              placeholder="Add a comment..."
            />
          </form>
        </Card>
      </InstaCardStyle>
    );
  }
}

InstaCard.propTypes = {
  instagram: PropTypes.arrayOf(
    PropTypes.shape({
      comments: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
          username: PropTypes.string
        })
      ),
      thumbnailUrl: PropTypes.string,
      timestamp: PropTypes.string,
      username: PropTypes.string
    })
  ),
  name: PropTypes.string
};

const mapStateToProps = state => ({
  instagram: state.insta.data,
  name: state.auth.user.name
});

export default connect(
  mapStateToProps,
  {
    addInstaComments,
    deleteInstaComment
  }
)(InstaCard);
