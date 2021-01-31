import React from 'react';

const ContactsItem = (props) => {
    return (
        <div key={props.contact.id}>
            <div>{props.contact.id}</div>
            <div>{props.contact.firstName}</div>
            <div>{props.contact.lastName}</div>
            <div>{props.contact.phone}</div>
            <button id={props.contact.id} onClick={props.openChangeContactModal}>Изменить Контакт</button>
            <button id={props.contact.id} onClick={props.deleteContact}>Удалить Контакт</button>
        </div>
    );
};

export default ContactsItem;


