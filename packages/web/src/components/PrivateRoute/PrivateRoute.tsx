import React, { FunctionComponent, ReactNode, ComponentProps } from 'react';
import { connect } from 'react-redux';
import { StoreState } from '../../store';
import { Authenticate } from '../../store/auth';
import { Route, Redirect } from 'react-router-dom';

interface PrivateRouteProps {
  auth: Authenticate;
  component: FunctionComponent;
  exact?: boolean;
  path: string;
}

function PrivateRoute({
  auth,
  component: Component,
  ...rest
}: PrivateRouteProps): JSX.Element {
  return (
    <Route
      {...rest}
      render={(props: ComponentProps<any>): ReactNode =>
        auth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

const mapStateToProps = (state: StoreState) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
