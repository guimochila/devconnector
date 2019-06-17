import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  if (!alerts || !alerts.length) {
    return null;
  }

  return alerts.map(alert => (
    <div key={alert.id} className={`alert alert-${alert.type}`}>
      {alert.message}
    </div>
  ));
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
