import {combineReducers} from 'redux'
import listsReducer from './listsreducer'


export default combineReducers({
    lists: listsReducer
});