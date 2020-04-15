//ACTION UNTUK UPDATE DATA

import { combineReducers } from 'redux'
import {counterReducer} from './counter'
import {listToDoReducer} from './listToDo'

export default combineReducers({
    counter : counterReducer,
    name : 'fikri',
    list : listToDoReducer
})