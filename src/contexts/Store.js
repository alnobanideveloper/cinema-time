import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk'; // Make sure this is the default export
import alertReducer from './alertReducer';
import reducer from './showsReducer';
import reviewReducer from './ReviewReducer';

const rootReducer = combineReducers({
    review: reviewReducer,
    movie: reducer,
    alert: alertReducer
});

// Compose enhancers if Redux DevTools Extension is available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)) // Combine thunk and DevTools
);

export default store;
