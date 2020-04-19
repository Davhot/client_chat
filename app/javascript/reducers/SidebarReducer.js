export function sidebar_reducer(state, action) {
  switch (action.type) {
    case "SET_SIDEBAR_OPEN":
      return { ...state, sidebarOpen: action.sidebarOpen };
  }
  return state;
};
