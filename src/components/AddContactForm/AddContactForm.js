import React, {useState} from 'react';
import {addContactAxios} from "../../store/reducers/contacts/action";
import {connect} from "react-redux";
import {getUserId} from "../../api/api";
import '../ChangeContactForm/contactModalForm.scss'
import {useInput} from "../../api/validation";

const mapStateToProps = (state) => {
    return {
        userId: getUserId(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addContactAxios: (firstName, lastName, phone, userId) => dispatch(addContactAxios(firstName, lastName, phone, userId))
    };
};


const AddContactForm = (props) => {

    const firstName = useInput('', {isEmpty: true});
    const lastName = useInput('', {isEmpty: true});
    const phone = useInput('', {isEmpty: true});


    const handleAddContact = (e) => {
        e.preventDefault()
        props.addContactAxios(firstName.value, lastName.value, phone.value, props.userId).then(props.onSave)
    }

    return (
        <div className='modal__form-wrapper'>
            <div>Добавить Контакт</div>
            <form className='modal__form' onSubmit={handleAddContact}>
                <input
                    onBlur={e => firstName.onBlur(e)}
                    onChange={e => firstName.onChange(e)}
                    type='text' name='firstName'
                    placeholder='Имя'
                    className='modal__input'
                    value={firstName.value}
                    autoComplete="off"/>
                <input
                    onBlur={e => lastName.onBlur(e)}
                    onChange={e => lastName.onChange(e)}
                    type='text'
                    name='lastName'
                    placeholder='Фамилия'
                    className='modal__input'
                    value={lastName.value}
                    autoComplete="off"/>
                <input
                    onBlur={e => phone.onBlur(e)}
                    onChange={e => phone.onChange(e)}
                    name='phone'
                    placeholder='Номер телефона'
                    className='modal__input'
                    value={phone.value}
                    autoComplete="off"/>
                <button disabled={!firstName.inputValid || !lastName.inputValid || !phone.inputValid}
                        className='modal__btn' onClick={handleAddContact}>Добавить
                </button>
            </form>
        </div>
    );

};

const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);
export default storeEnhancer(AddContactForm);
