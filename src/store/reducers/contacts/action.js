import {ADD_CONTACT, CHANGE_CONTACT, DELETE_CONTACT, SET_CONTACTS} from "./const";
import {instance} from "../../../api/api";

export const setContacts = (payload) => {
    return {
        type: SET_CONTACTS, payload
    }
}

export const addContact = (payload) => {
    return {
        type: ADD_CONTACT, payload
    }
}

export const changeContact = (payload) => {
    return {
        type: CHANGE_CONTACT, payload
    }
}

export const deleteContact = (payload) => {
    return {
        type: DELETE_CONTACT, payload
    }
}


export const getContactsAxios = (id) => (dispatch) => {
    return instance.get(`contacts?userId=${id}`)
        .then(response => dispatch(setContacts(response.data)))
};

export const addContactAxios = (contact, userId) => (dispatch) => {
    return instance.post('contacts',
        {
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            userId: userId
        }
    ).then(response => dispatch(addContact(response.data)))
}

export const changeContactAxios = (contact, userId, contactId) => (dispatch) => {
    return instance.patch(`contacts/${contactId}`,
        {
            firstName: contact.firstName,
            lastName: contact.lastName,
            phone: contact.phone,
            userId: userId
        }
    ).then(response => dispatch(changeContact(response.data)))
}

export const deleteContactAxios = (userId, contactId) => (dispatch) => {
    return instance.delete(`contacts/${contactId}`)
        .then(() => dispatch(deleteContact(contactId)))
}





