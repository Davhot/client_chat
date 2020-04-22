// Функции для Redux
export function getChannelsSuccess(data) {
  return {
    type: 'GET_CHANNELS_SUCCESS',
    channels: data
  };
};

export function createChannelSuccess(data) {
  return {
    type: 'CREATE_CHANNEL_SUCCESS',
    channel: data
  };
};

export function deleteChannelSuccess(channel_id) {
  return {
    type: 'DELETE_CHANNEL_SUCCESS',
    channel_id: channel_id
  };
};

export function updateChannelSuccess(data) {
  return {
    type: 'UPDATE_CHANNEL_SUCCESS',
    channel: data
  };
}

export function setEditChannel(channel) {
  var params = {
    type: 'SET_EDIT_CHANNEL',
    editChannel: channel
  };

  return dispatch => {
    return dispatch(params);
  };
};
