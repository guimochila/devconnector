import React, { FormEvent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { StoreState } from '../../store';
import { setAlert } from '../../store/alerts';
import { Authenticate, register, UserInput } from '../../store/auth';

interface RegisterProps {
  setAlert: (message: string, type: string) => void;
  register: ({  }: UserInput) => void;
  auth: Authenticate;
}

interface InitalState {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

function Register({ setAlert, register, auth }: RegisterProps): JSX.Element {
  const [values, handleChange] = useForm<InitalState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onSubmit = (e: FormEvent<HTMLElement>): void => {
    e.preventDefault();

    if (values.password !== values.confirmPassword) {
      setAlert('Passwords do not match.', 'danger');
      return;
    }

    register({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  if (auth.isAuthenticated) {
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
            value={values.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={values.email}
            onChange={handleChange}
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
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            minLength={6}
            value={values.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
}

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { setAlert, register },
)(Register);
