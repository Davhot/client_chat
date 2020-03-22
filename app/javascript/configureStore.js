import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const initialState = {
  categories: [],
  notes: [],
  mode: 'index',
  current_category_id: null,
  current_note_id: null
};

function rootReducer(state, action) {
  const reducers = [(state, action) => { return state }];

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
