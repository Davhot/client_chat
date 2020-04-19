// Функции для Redux
export function getChannelsSuccess(data) {
  return {
    type: 'GET_CHANNELS_SUCCESS',
    channels: data
  };
};
