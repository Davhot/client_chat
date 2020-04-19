export function channels_reducer(state, action) {
  switch (action.type) {
    case "GET_CHANNELS_SUCCESS":
      return { ...state, channels: action.channels };
    case "CREATE_CHANNEL_SUCCESS":
      return {...state, channels: state.channels.concat([action.channel]) };
    case "DELETE_CHANNEL_SUCCESS":
      let channels = state.channels.filter(function(channel) { return channel.id != action.channel_id });
      return {...state, channels: channels };
  }
  return null;
};
