import {applyMiddleware, combineReducers, compose, legacy_createStore as createStore} from "redux";
import authReducer from "./auth-reducer";
import dialogsReducer from "./dialogs-reducer"
import profileReducer from "./profile-reducer"
import usersReducer from "./users-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";

let redusersBatch = combineReducers({
    postsData: profileReducer,
    dialogsData: dialogsReducer,
    usersData: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

let store = createStore(redusersBatch, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;