import { combineReducers } from 'redux';

const createUser = (state = {}, action) => {
    switch (action.type) {

      case "loading":
          return {
              isLoading: true,
              isError: false,
              isSuccess: false,
              errors: null,
              isLoggedIn:false
          }

      case "success":
          return {
              isLoading: false,
              isError: false,
              isSuccess: true,
              errors: null,
              isLoggedIn:true              
          }

      case "fail":
          return {
              isLoading: false,
              isError: true,
              isSuccess: false,
              errors: action.payload,
              isLoggedIn:false
          }

      default:
        return state;
    }
}

export default combineReducers({
  createUser
});