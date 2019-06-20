export function changeAlert(message, type, id) {
  return function(dispatch) {
    dispatch({
      type: 'SET_ALERT',
      payload: {
        message,
        type,
        id,
      },
    });

    setTimeout(() => dispatch({ type: 'REMOVE_ALERT', payload: id }), 5000);
  };
}
