export function setEditing(opt) {
  var params = {
    type: 'SET_EDITING',
    editing: opt
  };

  return dispatch => {
    return dispatch(params);
  };
};
