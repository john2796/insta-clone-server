import React, { Component } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from "reactstrap";
// import PropTypes from "prop-types";
import styled from "styled-components";
import sprite from "../../assets/smallerSprite.png";

const NavbarStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 80px;
  background: white;
  border-bottom: 1px solid #e9e9e9;
  position: fixed;
  top: 0;
  width: 100%;
  display: block;
  z-index: 1000;
  .far {
    font-size: 20px;
    color: gray;
    margin: 0 5px;
    cursor: pinter;
  }
  .fab {
    font-size: 30px;

    line-height: 25px;
    cursor: pinter;
  }
  .navbar {
    margin: 0 auto;
    width: 950px;
    background: white;
    min-height: 80px;
  }
  .title_sprite {
    background-repeat: no-repeat;
    background-position: -58px 0;
    height: 29px;
    width: 103px;
    margin: 0 0 0 20px;
    margin-right: 190px;
  }
  .logo {
    display: flex;
    align-items: center;
  }
  .user_sprite {
    background-position: -208px -194px;
    background-repeat: no-repeat;

    height: 24px;
    width: 24px;
  }
  .heart_sprite {
    background-repeat: no-repeat;
    background-position: -104px -142px;
    height: 24px;
    width: 24px;
  }
  .compass_sprite {
    background-repeat: no-repeat;
    background-position: -216px -78px;
    height: 24px;
    width: 24px;
  }
  .logo_sprite {
    background-repeat: no-repeat;
    background-position: -163px -90px;
    height: 24px;
    width: 24px;
  }
  .logo_line {
    background-color: #262626;
    height: 28px;
    margin: 0 16px;
    width: 1px;
    margin-right: -10px;
  }
  input {
    font-size: 12px;
    text-align: center;
    width: 202px;
  }
`;

class InstaNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const { onLogoutClick, searchTerm, handleChange } = this.props;
    return (
      <NavbarStyle>
        <Navbar light expand="md" className="navbar ">
          <NavbarBrand href="/" className="logo">
            <div
              className="logo_sprite fab"
              style={{
                backgroundImage: `url(${sprite})`
              }}
            />
            <span className="logo_line" />
            <div
              className="title_sprite"
              style={{
                backgroundImage: `url(${sprite})`
              }}
            />
          </NavbarBrand>
          <NavbarBrand className="ml-auto">
            <Input
              placeholder="Search"
              name="searchTerm"
              value={searchTerm}
              onChange={handleChange}
              className="serach"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">
                  <div
                    className="compass_sprite far"
                    style={{
                      backgroundImage: `url(${sprite})`
                    }}
                  />
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  <div
                    className="heart_sprite far"
                    style={{
                      backgroundImage: `url(${sprite})`
                    }}
                  />
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <div
                    className="user_sprite far"
                    style={{
                      backgroundImage: `url(${sprite})`
                    }}
                  />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem divider />
                  <DropdownItem onClick={onLogoutClick}>Logout</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </NavbarStyle>
    );
  }
}

// InstaNavbar.propTypes = {};

export default InstaNavbar;
