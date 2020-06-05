import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import transaction from './reducers/transaction.js';
import budget from './reducers/budget.js';
import message from './reducers/message.js';
import mode from './reducers/mode.js';
import view from './reducers/view.js';

const reducers = combineReducers({
    view,
    mode,
    message,
    transaction,
    budget
});

// const store = createStore(reducers, sampleState);
let _middlewares = [thunk];
if (WEBPACK_MODE !== 'build') {
    _middlewares.push(logger);
}
const store = createStore(reducers, applyMiddleware(..._middlewares));

export default store;

