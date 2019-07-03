import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { StoreState } from '../../store';
import { logout, Authenticate } from '../../store/auth';
import './Nav.css';

interface NavProps {
  auth: Authenticate;
  logout: () => void;
}

const Navbar = ({ auth, logout }: NavProps): JSX.Element => {
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
      {auth.isAuthenticated ? authLinks : guestLinks}
    </nav>
  );
};

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logout },
)(Navbar);
