import React from 'react';
import './contactsItem.scss'

const ContactsItem = (props) => {
    return (
        <div key={props.contact.id} className='contacts-item__body' >
            <div className='contacts-item__text' >{props.contact.firstName}</div>
            <div className='contacts-item__text' >{props.contact.lastName}</div>
            <div className='contacts-item__text' >{props.contact.phone}</div>
            <div>
            <button className='contacts-item__btn' id={props.contact.id} onClick={props.openChangeContactModal}>Изменить Контакт</button>
            <button className='contacts-item__btn' id={props.contact.id} onClick={props.deleteContact}>Удалить Контакт</button>
            </div>
        </div>
    );
};

export default ContactsItem;


