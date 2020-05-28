import {fetchApi} from "../service/api"
export const savePhoto = (payload) => {
    return async (dispatch) => {
        try {
          dispatch({
            type: "SAVE_PHOTO_LOADING"
          }) 
          const response = await fetchApi("/photo/save", "POST", payload, 200) 
          if(response.success) {
            dispatch({
                type: "SAVE_PHOTO_SUCCESS"
            }) 
            return response 
          } else {
            throw response 
          }

        } catch (error) {
            dispatch({
                type: "SAVE_PHOTO_FAIL",
                payload: error.responseBody
            }) 
            return error 
        }
    }
}