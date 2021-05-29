
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import authReducer from './auth/reducer';
import projectReducer from './project/reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer
});

export const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
));
