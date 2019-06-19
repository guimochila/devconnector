import React, { Fragment, FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import { changeAlert } from '../../actionCreators/changeAlert.js';
import { register } from '../../actionCreators/changeAuth.js';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';

interface IProps {
  changeAlert: (message: string, alertType: string, id: string) => {};
  register: ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {};
  isAuthenticated: boolean;
}

const initialState = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
};

const Register: FunctionComponent<IProps> = ({
  changeAlert,
  register,
  isAuthenticated,
}) => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [values, handleChanges] = useFormValidation(initialState);

  const {
    name,
    email,
    password,
    confirmPassword,
  }: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  } = data;

  const onChange = e => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    if (password !== confirmPassword) {
      changeAlert('Passwords do not match.', 'danger', nanoid(10));
      return;
    }

    register({ name, email, password });
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            required={true}
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength={6}
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength={6}
            value={confirmPassword}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  changeAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { changeAlert, register },
)(Register);
