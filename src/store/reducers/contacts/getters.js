
export function getterUserId(state) {
    return state.contacts.userId || 0;
}

export function getContactById(state, id) {
    // eslint-disable-next-line
    return state.contacts.contacts.find(contact => contact.id == id);
}

export function getContacts(state) {
    return state.contacts.contacts || [];
}


