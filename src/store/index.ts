import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routeReducer } from './reducer/';

export const store = createStore(routeReducer, composeWithDevTools(applyMiddleware(thunk)));