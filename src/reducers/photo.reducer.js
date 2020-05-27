import { combineReducers } from 'redux' 
const savePhoto = (state = {}, action) => {
    switch (action.type) {

      case "SAVE_PHOTO_LOADING":
          return {
              isLoading: true,
              isError: false,
              isSuccess: false,
              errors: null,

          }

      case "SAVE_PHOTO_SUCCESS":
          return {
              isLoading: false,
              isError: false,
              isSuccess: true,
              errors: null
          }
      default:
        return state 
    }
}

export default savePhoto
