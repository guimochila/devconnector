import React, { FunctionComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actionCreators/changeAuth.js';

import './Nav.css';

interface IProps {
  isAuthenticated: boolean;
  loading: boolean;
  logout(): void;
}

const Navbar: FunctionComponent<IProps> = ({
  isAuthenticated,
  loading,
  logout,
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link onClick={logout} to="#">
          <i className="fas fa-sign-out-alt" />
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code" /> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(
  mapStateToProps,
  { logout },
)(Navbar);
