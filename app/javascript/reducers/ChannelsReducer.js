export function channels_reducer(state, action) {
  switch (action.type) {
    case "GET_CHANNELS_SUCCESS":
      return { ...state, channels: action.channels };
  }
  return null;
};
