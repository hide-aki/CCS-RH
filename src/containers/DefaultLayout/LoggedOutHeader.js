import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import { DropdownToggle, Nav } from "reactstrap";
import PropTypes from "prop-types";

import { AppHeaderDropdown, AppNavbarBrand } from "@coreui/react";
import logo from "../../assets/img/brand/logo.png";
import sygnet from "../../assets/img/brand/logo.png";
import avatar from "../../assets/img/brand/home.png";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  // eslint-disable-next-line
  constructor() {
    super();

  }

  signOut(e) {
    //this.props.history.replace("/login");
    window.location.href = "/login";
  }

  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppNavbarBrand
          full={{ src: logo, height: 37, alt: "CCS Logo" }}
          minimized={{ src: sygnet, height: 13, alt: "CCS Logo" }}
        />

        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img
                src={avatar}
                className="img-avatar"
                alt="admin.com"
                onClick={e => this.signOut(e)}
              />
            </DropdownToggle>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
