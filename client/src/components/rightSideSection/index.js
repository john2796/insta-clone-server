import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import moment from "moment";
import { Card, CardBody, CardTitle } from "reactstrap";

const RightSideStyle = styled.div`
  background: white;
  background: #f8f9fa;
  min-width: 350px;
  max-width: 350px;
  margin-left: -5px;
  position: fixed;
  top: 200px;
  @media (max-width: 800px) {
    display: none;
  }

  .card_title {
    display: flex;
    justify-content: space-between;
    p {
      color: #8e8e8e;
      font-size: 17px;
    }
    span {
      color: #4c4c4c;
      font-size: 12px;
      font-weight: bold;
      margin-left: auto;
    }
  }
  .rightImg {
    max-width: 100%;
    display: block;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    padding: 3px;
    border: 1.2px solid #d73378;
    margin-right: 15px;
  }
  .parent_flex {
    display: flex;
    .sub_item {
      h4 {
        font-size: 15px;
      }
      p {
        color: #c4c4c4;
        font-size: 12px;
        margin-top: -7px;
      }
    }
  }

  .scroll {
    height: 224px;
    overflow: auto;
  }

  .header_folow {
    min-width: 250px;
    display: flex;
    justify-content: space-between;
    span {
      font-size: 12px;
      margin-left: 10px;
      text-align: left;
    }
  }
  .first_card {
    margin-bottom: 15px;
  }
`;

const HeaderStyle = styled.div`
  @media (max-width: 800px) {
    display: none;
  }
  position: fixed;
  padding-top: 80px;
  min-width: 350px;
  max-width: 350px;

  margin-bottom: 20px;
  .user_profile {
    display: flex;
    align-items: center;
    img {
      object-fit: cover;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .user_info {
      margin-left: 15px;
      h3 {
        font-size: 20px;
        margin-bottom: -4px;
      }
      span {
        font-size: 12px;
        color: gray;
      }
    }
  }
`;

class RightSide extends Component {
  render() {
    return (
      <React.Fragment>
        <HeaderStyle>
          <div className="user_profile">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXujZKHV8PlOQPiP4KYoDGd_1Cvk6KpFlCpmB1y7l7Caf-EivJ"
              alt="user"
            />
            <div className="user_info">
              <h3>{this.props.name}</h3>
              <span>
                web16{" "}
                <span role="img" aria-label="firaa">
                  🔥
                </span>
              </span>
            </div>
          </div>
        </HeaderStyle>
        <RightSideStyle>
          <Card className="first_card">
            <CardBody>
              <CardTitle className="card_title">
                <p>Stories</p> <span className="all">Watch All</span>
              </CardTitle>
              <div className="scroll">
                {this.props.instagram.map(item => (
                  <div key={item._id} className="parent_flex ">
                    <img
                      src={item.imageUrl}
                      alt={item.username}
                      className="rightImg"
                    />
                    <span className="sub_item">
                      <h4>{item.username}</h4>
                      <p>{moment(item.timestamp).fromNow()}</p>
                    </span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <CardTitle className="card_title">
                <p>Suggestions For You</p> <span className="all">See All</span>
              </CardTitle>
              <div>
                {this.props.instagram.map(item => (
                  <div key={item._id} className="parent_flex">
                    <img
                      src={item.imageUrl}
                      alt={item.username}
                      className="rightImg"
                    />
                    <span className="sub_item">
                      <h4 className="header_folow">
                        {item.username}{" "}
                        <span>
                          <a href="https://github.com/john2796">Follow</a>
                        </span>
                      </h4>
                      <p>{moment(item.timestamp).fromNow()}</p>
                    </span>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </RightSideStyle>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  name: state.auth.user.name,
  instagram: state.insta.data
});

export default connect(mapStateToProps)(RightSide);
