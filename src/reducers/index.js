import { combineReducers} from 'redux'

import authReducer from"./auth.reducer.js"

const reducers ={
    authReducer
}

export default combineReducers(reducers)