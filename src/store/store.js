import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./reducers/auth/reducer";
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import contactsReducer from "./reducers/contacts/reducer"
const reducers = combineReducers({
    auth: authReducer,
    contacts: contactsReducer
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store;