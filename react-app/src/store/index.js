import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
// import notesReducer from './note'
// import notebooksReducer from './notebook';
// import tasksReducer from './task';
// import tagsReducer from './tag';
// import shortcutsReducer from './shortcut';


const rootReducer = combineReducers({
  session,
  // notes: notesReducer,
  // notebooks: notebooksReducer,
  // tasks: tasksReducer,
  // tags: tagsReducer,
  // shortcuts: shortcutsReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
