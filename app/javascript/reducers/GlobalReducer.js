export function global_reducer(state, action) {
  switch (action.type) {
    case "SET_EDITING":
      return { ...state, editing: action.editing };
    case "ADD_ERROR":
      console.log(action.error)
      return state;
  }
  return null;
};
