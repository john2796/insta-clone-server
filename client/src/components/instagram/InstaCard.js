import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import uuidv4 from "uuid/v4";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Input
} from "reactstrap";
import {
  addInstaComments,
  deleteInstaComment
} from "../../store/action/instaCommentAction";

const InstaCardStyle = styled.div`
  .comment_icons {
    margin-bottom: 10px;
    .comment_icons_heart .far {
      margin-right: 10px;
    }
    .comment_icons_heart .far,
    .comment_icons_comm .far {
      font-size: 25px;
      color: gray;
    }
  }
  .input_comment[type="placeholder"] {
    padding: 100px auto;
  }
`;

class InstaCard extends Component {
  state = {
    message: ""
  };

  addComment = (e, username) => {
    e.preventDefault();
    if (!this.state.message) return;
    const newComments = this.props.instagram;
    const postComments = {
      text: this.state.message,
      username: this.props.name,
      commentId: uuidv4()
    };
    newComments.map(comment => {
      if (comment.username === username) {
        comment.comments.push(postComments);
      }
    });

    this.props.addInstaComments(username, newComments, postComments);
    this.setState({ message: "" });
  };

  deleteComment = (e, commentId, username) => {
    const deleteComments = this.props.instagram;
    deleteComments.map(deletedComment => {
      if (deletedComment.username === username) {
        deletedComment.comments.filter(
          comment => comment.commentId !== commentId
        );
      }
    });

    this.props.deleteInstaComment(commentId, username, deleteComments);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  // likeHanlder = id => {
  //   const { data } = this.props.instagram;
  //   this.props.onToggleLikesHandler(id, data);
  // };

  render() {
    const {
      item: {
        imageUrl,
        username,
        likes,
        timestamp,
        thumbnailUrl,
        comments,
        id,
        isLiked
      }
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
              alt={comments[0].text}
            />
            {username}
          </CardTitle>
          <CardImg
            top
            width="100%"
            src={imageUrl}
            alt="Card image cap"
            style={{
              objectFit: "cover"
            }}
          />

          <CardBody>
            <div className="comment_icons">
              <span className="comment_icons_heart">
                <i
                  className="far fa-heart"
                  style={isLiked ? { color: "red" } : null}
                  onClick={() => this.likeHanlder(id)}
                />
              </span>
              <span className="comment_icons_comm">
                <i className="far fa-comment" />
              </span>
            </div>
            <CardSubtitle
              style={{
                fontWeight: "bold",
                margin: "4px 0 10px 0"
              }}
            >
              {isLiked ? likes + 1 : likes} likes
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
                </span>
                <span>
                  <Button
                    outline
                    color="secondary"
                    style={{ fontSize: 12, borderRadius: "90%" }}
                    onClick={e =>
                      this.deleteComment(e, comment.commentId, username)
                    }
                  >
                    X
                  </Button>
                </span>
              </CardText>
            ))}

            <span
              style={{
                fontSize: 12,
                color: "gray"
              }}
            >
              {timestamp}
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
              style={{
                minWidth: "60%",
                borderTopColor: "#DFDFDF",
                fontSize: 14
              }}
            />
          </form>
        </Card>
      </InstaCardStyle>
    );
  }
}

InstaCard.propTypes = {
  instagram: PropTypes.shape({
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
