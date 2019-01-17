import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";

import { onToggleLikesHandler } from "../../store/action/instaAction";
import {
  getInstaComments,
  addInstaComments
} from "../../store/action/instaCommentAction";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input
} from "reactstrap";

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

  componentDidMount() {
    this.props.getInstaComments();
  }

  handleSubmit = (e, id) => {
    e.preventDefault();
    this.props.addInstaComments(this.state.message, this.props.instacomments);
    this.setState({ message: "" });
    // const { data } = this.props.instagram;
    // if (!this.state.message) return;
    // const newItem = data.map(post => {
    //   if (post.id === id) {
    //     post.comments.push({
    //       text: this.state.message,
    //       username: post.username
    //     });
    //   }
    //   return post;
    // });
    // this.props.onAddHandler(newItem);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  likeHanlder = id => {
    const { data } = this.props.instagram;
    this.props.onToggleLikesHandler(id, data);
  };

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
      },
      instacomments
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

            <div>
              {comments.map((dummyComment, index) => (
                <div key={index}>
                  <span
                    style={{
                      fontWeight: "bold",
                      marginRight: 5
                    }}
                  >
                    {dummyComment.username}
                  </span>
                  <span>{dummyComment.text}</span>
                </div>
              ))}
            </div>
            {instacomments.map(comment => (
              <CardText
                key={comment._id}
                style={{
                  margin: "6px 0"
                }}
              >
                <span style={{ fontWeight: "bold", marginRight: 5 }}>
                  {this.props.user.name}
                </span>
                <span>{comment.text}</span>
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
          <form onSubmit={e => this.handleSubmit(e, id)}>
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
  instagram: state.instagram,
  instacomments: state.insta.comments,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {
    onToggleLikesHandler,
    getInstaComments,
    addInstaComments
  }
)(InstaCard);
