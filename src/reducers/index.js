import {combineReducers} from 'redux'

import authReducer from "./auth.reducer.js"
import userReducer from "./user.reducer.js"
import photoReducer from "./photo.reducer.js"

import {reducer as formReducer} from 'redux-form'

const reducers = {
    authReducer,
    userReducer,
    photoReducer,
    form: formReducer
}

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => {

    if (action.type === "USER_LOGGED_OUT_SUCCESS") {
        state = {}
    }

    return appReducer(state, action);
}

export default rootReducer;
