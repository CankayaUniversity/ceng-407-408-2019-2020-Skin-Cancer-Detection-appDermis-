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