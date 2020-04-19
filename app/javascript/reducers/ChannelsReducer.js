export function channels_reducer(state, action) {
  switch (action.type) {
    case "GET_CHANNELS_SUCCESS":
      return { ...state, channels: action.channels };
    case "CREATE_CHANNEL_SUCCESS":
      return {...state, channels: state.channels.concat([action.channel]) };
  }
  return null;
};
