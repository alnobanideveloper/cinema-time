import {createStore , combineReducers} from 'redux';
import  reducer from './showsReducer'
import reviewReducer from './ReviewReducer';

const rootReducer = combineReducers({
    review : reviewReducer,
    movie : reducer
})
const store = createStore(
    rootReducer,  
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)


export default store;