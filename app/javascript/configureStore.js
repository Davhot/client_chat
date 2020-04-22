import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { sidebar_reducer } from './reducers/SidebarReducer'
import { channels_reducer } from './reducers/ChannelsReducer'
import { global_reducer } from './reducers/GlobalReducer'

const initialState = {
  sidebarOpen: false,
  channels: [],
  editing: false,
  editChannel: {},
  toasterMessages: []
};

function rootReducer(state, action) {
  const reducers = [sidebar_reducer, channels_reducer, global_reducer];

  for (let reducer of reducers) {
    let res = reducer(state, action);
    if (res) { return res; }
  }

  return state;
};

export default function configureStore() {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk)
  );
  return store;
};
