import {combineReducers} from 'redux'
import {REGISTER_SUCCESS, REGISTER_FAIL} from "../actions/types";
import {AsyncStorage} from "react-native";

const initialState = {
    token: AsyncStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
}

const authData = (state = {}, action) => {
    switch (action.type) {
        case "AUTH_USER_SUCCESS":
            return {
                token: action.token,
                isLoggedIn: true
            }

        case "AUTH_USER_FAIL":
            return {
                token: null,
                isLoggedIn: false
            }
        default:
            return state
    }
}

const createUser = (state = {}, action) => {
    switch (action.type) {

        case "CREATE_USER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null,

            }

        case "CREAT_USER_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null
            }

        case "CREAT_USER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload
            }

        default:
            return state
    }
}
const updateUser = (state = {}, action) => {
    switch (action.type) {
        case "UPDATE_USER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }
        case "UPDATE_USER_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
            }
        case "UPDATE_USER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload
            }
        default:
            return state
    }

}
const loginUser = (state = {}, action) => {
    switch (action.type) {

        case "LOGIN_USER_LOADING":
            return {
                isLoading: true,
                isError: false,
                isSuccess: false,
                errors: null
            }

        case "LOGIN_USER_SUCCESS":
            return {
                isLoading: false,
                isError: false,
                isSuccess: true,
                errors: null,
            }

        case "LOGIN_USER_FAIL":
            return {
                isLoading: false,
                isError: true,
                isSuccess: false,
                errors: action.payload
            }

        default:
            return state
    }
}

export default async function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case REGISTER_SUCCESS:
            await AsyncStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
            }
        case REGISTER_FAIL:
            await AsyncStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false,
            }
        default:
            return state
    }
}
