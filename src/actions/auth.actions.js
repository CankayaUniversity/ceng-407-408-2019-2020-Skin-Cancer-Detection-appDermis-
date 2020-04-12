import {fetchApi} from "../service/api"

export const createNewUser =  (payload) => {
    
    return async (dispatch) =>{
        try {
            dispatch({type:"loading"})
            const response = await fetchApi("/user/create","POST",payload,200)
            if(response.success){
                dispatch({type:"success",
                token:response.token})                
            }
            else{
                throw response
            }
               
        } catch (error) {
            dispatch({type:"fail",
                payload:error.responseBody})
            
        }
    }
}

export const loginUser = (payload) => {
    return async (dispatch) => {

        try {
          dispatch({
            type: "LOGIN_USER_LOADING"
          });
          const response = await fetchApi("/user/login", "POST", payload, 200);

          if(response.success) {
            dispatch({
                type: "LOGIN_USER_SUCCESS",
            });
            dispatch({
                type: "AUTH_USER_SUCCESS",
                token: response.token
            });
            dispatch({
                type: "GET_USER_SUCCESS",
                payload: response.responseBody
            });
            return response;
          } else {
            throw response;
          }

        } catch (error) {
            dispatch({
                type: "LOGIN_USER_FAIL",
                payload: error.responseBody
            });
            return error;
        }
    }
}