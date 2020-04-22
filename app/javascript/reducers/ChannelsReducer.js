export function channels_reducer(state, action) {
  let channels;
  switch (action.type) {
    case "GET_CHANNELS_SUCCESS":
      return { ...state, channels: action.channels };
    case "CREATE_CHANNEL_SUCCESS":
      return {...state, channels: state.channels.concat([action.channel]) };
    case "DELETE_CHANNEL_SUCCESS":
      channels = state.channels.filter(function(channel) { return channel.id != action.channel_id });
      return {...state, channels: channels };
    case "SET_EDIT_CHANNEL":
      return { ...state, editChannel: action.editChannel };
    case "UPDATE_CHANNEL_SUCCESS":
      channels = state.channels.filter(function(current_channel) {
        return action.channel.id != current_channel.id;
      });
      return {...state, channels: channels.concat([action.channel]) };
  }
  return null;
};
