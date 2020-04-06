import { createStore, applyMiddleware} from 'redux'
import {AsyncStorage} from 'react-native';
import reducers from "../reducers"
import { persistStore, persistReducer } from 'redux-persist'
//import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, reducers)
 
export default () => {
  let store = createStore(persistedReducer,{},applyMiddleware())
  let persistor = persistStore(store)
  return { store, persistor }
}