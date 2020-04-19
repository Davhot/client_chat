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
