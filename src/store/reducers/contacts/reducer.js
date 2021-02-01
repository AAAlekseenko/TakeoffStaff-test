import {ADD_CONTACT, SET_CONTACTS, CHANGE_CONTACT, DELETE_CONTACT} from "./const";

const initialState = {
    contacts: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTACTS:
            return {
                ...state,
                contacts: action.payload
            }
        case ADD_CONTACT:
            return {
                ...state,
                contacts: [...state.contacts, action.payload]
            }
        case CHANGE_CONTACT:
            return {
                ...state,
                // eslint-disable-next-line
                contacts: state.contacts.map(contact => contact.id == action.payload.id ? action.payload : contact),
            }
        case DELETE_CONTACT:
            return {
                ...state,
                // eslint-disable-next-line
                contacts: state.contacts.filter((contact) => contact.id != action.payload)
            }

        default:
            return state
    }
}


export default reducer;

