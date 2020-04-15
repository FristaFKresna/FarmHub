//READ DATA

import { combineReducers } from 'redux'
import {counterReducer} from './counter'
import {userReducer} from './user'
import {listToDoReducer} from './listToDo'



export default combineReducers({
    counter : counterReducer,
    name : userReducer,
    list : listToDoReducer
})