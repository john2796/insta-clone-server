import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import styled from "styled-components";

import PropTypes from "prop-types";
import InstaNavbar from "./InstaNavbar";
import InstaCard from "./InstaCard";
import {
  getInstaComments,
  setPostsLoading
} from "../../store/action/instaCommentAction";
import RightSide from "../rightSideSection/index";

const InstagramStyle = styled.div`
  .left_side,
  .right_side {
    border: 1px solid gray;
  }
  .loading {
    margin: 0 auto;
    text-align: center;
  }
`;

class Instagram extends Component {
  state = {
    searchTerm: ""
  };

  componentDidMount() {
    this.props.setPostsLoading();
    this.props.getInstaComments();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { instagram, onLogoutClick } = this.props;
    const { searchTerm } = this.state;

    const filterDummyData = instagram.filter(ig => {
      return ig.username.indexOf(this.state.searchTerm) !== -1;
    });
    const cardComponent = !filterDummyData.length ? (
      <img
        src="https://media.giphy.com/media/fMZU6xl2OHgHe/200.gif"
        alt="no match"
      />
    ) : (
      filterDummyData.map((item, index) => (
        <InstaCard key={index} item={item} />
      ))
    );

    return (
      <InstagramStyle>
        <InstaNavbar
          onLogoutClick={onLogoutClick}
          searchTerm={searchTerm}
          handleChange={this.handleChange}
        />
        <Container
          className="wrapper"
          style={{ maxWidth: "920px", margin: "0 auto", background: "#F8F9FA" }}
        >
          <Row style={{ marginTop: "50px" }}>
            <Col sm="8">
              {this.props.loading ? (
                <div className="loading">
                  <img
                    src="https://thumbs.gfycat.com/InnocentFlusteredAquaticleech-small.gif"
                    alt="loading..."
                  />
                </div>
              ) : (
                cardComponent
              )}
            </Col>
            <Col sm="4">
              <RightSide />
            </Col>
          </Row>
        </Container>
      </InstagramStyle>
    );
  }
}

Instagram.propTypes = {
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
  )
};

const mapStateToProps = state => ({
  instagram: state.insta.data,
  loading: state.insta.loading
});

export default connect(
  mapStateToProps,
  { getInstaComments, setPostsLoading }
)(Instagram);
