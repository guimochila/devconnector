import React, { Fragment, FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import { changeAlert } from '../../actionCreators/changeAlert.js';
import PropTypes from 'prop-types';
import nanoid from 'nanoid';

interface IProps {
  changeAlert: (message: string, alertType: string, id: string) => {};
}

const initialState = {
  email: '',
  name: '',
  password: '',
  confirmPassword: '',
};

const Register: FunctionComponent<IProps> = ({ changeAlert }) => {
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

    changeAlert('Form sent', 'success', nanoid(10));
  };

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
};

export default connect(
  null,
  { changeAlert },
)(Register);
