export function onSetSidebarOpen(open) {
  const params = {
    type: 'SET_SIDEBAR_OPEN',
    sidebarOpen: open
  }
  return dispatch => {
    return dispatch(params);
  };
}
