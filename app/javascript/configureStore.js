import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { sidebar_reducer } from './reducers/SidebarReducer'
import { channels_reducer } from './reducers/ChannelsReducer'

const initialState = {
  sidebarOpen: false,
  channels: []
};

function rootReducer(state, action) {
  const reducers = [sidebar_reducer, channels_reducer];

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
