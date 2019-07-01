import React from 'react';
import { connect } from 'react-redux';
import { Alert } from '../../store/alerts';
import { StoreState } from '../../store';

interface AlertProps {
  alerts: Alert[];
}

function DisplayAlert({ alerts }: AlertProps) {
  if (!alerts || !alerts.length) {
    return null;
  }

  return (
    <div>
      {alerts.map((alert: Alert) => (
        <div key={alert.id} className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = ({ alerts }: StoreState): { alerts: Alert[] } => ({
  alerts,
});

export default connect(mapStateToProps)(DisplayAlert);
