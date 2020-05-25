import {fetchApi} from "../service/api"
import {Dimensions} from "react-native";
import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL, REGISTER_LOADING, AUTH_USER_SUCCESS, GET_USER_SUCCESS
} from "./types";

 //this.props.navigation.navigate('Login');

export const register = (newUser) => {
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return async (dispatch) => {
        try {
            dispatch({
                type: REGISTER_LOADING
            })
            let res = axios.post('http://192.168.1.106:3333/api/users/', newUser, config);

            if (res.success) {
                dispatch({
                    type: REGISTER_SUCCESS
                })
                dispatch({
                    type: AUTH_USER_SUCCESS,
                    token: res.token
                })
                dispatch({
                    type: GET_USER_SUCCESS,
                    payload: res.data
                })

                return res
            } else {
                throw res
            }

        } catch (error) {
            dispatch({
                type: REGISTER_FAIL
            })
            return error
        }
    }
}
export const updateUser = (payload) => {
    return async (dispatch) => {

        try {
            dispatch({
                type: "UPDATE_USER_LOADING"
            })
            const response = await fetchApi("/user/update", "POST", payload, 200)

            if (response.success) {
                dispatch({
                    type: "UPDATE_USER_SUCCESS"
                })
                dispatch({
                    type: "AUTH_USER_SUCCESS",
                    token: response.token
                })
                dispatch({
                    type: "GET_USER_SUCCESS",
                    payload: response.responseBody
                })

                return response
            } else {
                throw response
            }

        } catch (error) {
            dispatch({
                type: "UPDATE_USER_FAIL",
                payload: error.responseBody
            })
            return error
        }
    }
}

export const loginUser = (payload) => {
    return async (dispatch) => {

        try {
            dispatch({
                type: "LOGIN_USER_LOADING"
            })
            const response = await fetchApi("/user/login", "POST", payload, 200)

            if (response.success) {
                dispatch({
                    type: "LOGIN_USER_SUCCESS",
                })
                dispatch({
                    type: "AUTH_USER_SUCCESS",
                    token: response.token
                })
                dispatch({
                    type: "GET_USER_SUCCESS",
                    payload: response.responseBody
                })
                return response
            } else {
                throw response
            }

        } catch (error) {
            dispatch({
                type: "LOGIN_USER_FAIL",
                payload: error.responseBody
            })
            return error
        }
    }
}
export const logoutUser = () => {
    return async (dispatch, getState) => {
        const state = getState()
        try {
            const {authReducer: {authData: {token}}} = state
            console.log(token)
            const response = await fetchApi("/user/logout", "DELETE", null, 200, token)
            console.log(response)
            dispatch({
                type: "USER_LOGGED_OUT_SUCCESS"
            })
        } catch (e) {
            console.log(e)
        }
    }
}
