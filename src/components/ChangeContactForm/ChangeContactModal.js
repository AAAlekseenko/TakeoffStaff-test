import React, {useState, useEffect} from 'react';
import {connect} from "react-redux";
import {getUserId} from "../../api/api";
import {changeContactAxios} from "../../store/reducers/contacts/action";
import {getContactById} from "../../store/reducers/contacts/getters";

const mapStateToProps = (state, {contactId}) => {
    return {
        userId: getUserId(state),
        contact: getContactById(state, contactId),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeContactAxios: (user, userId, contactId, state) => dispatch(changeContactAxios(user, userId, contactId, state))
    };
};

const ChangeContactForm = (props) => {
    const [user, setUser] = useState({firstName: '', lastName: '', phone: ''})

    useEffect(() => {
        setUser({
            firstName: props.contact.firstName || '',
            lastName: props.contact.lastName || '',
            phone: props.contact.phone || ''
        })
    }, [props.contact])


    const handleChangeUser = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    const handleChangeContact = (e) => {
        e.preventDefault()
        props.changeContactAxios(user, props.userId, props.contactId).then(props.onChange)
    }

    return (
        <div className='modal__form-wrapper'>
            <div>Изменить Контакт</div>
            <form className='modal__form' onSubmit={handleChangeContact}>
                <input onChange={handleChangeUser} type='text' name='firstName' placeholder='Имя'
                       className='model__input' value={user.firstName} autoComplete="off"/>
                <input onChange={handleChangeUser} type='text' name='lastName' placeholder='Фамилия'
                       className='model__input' value={user.lastName} autoComplete="off"/>
                <input onChange={handleChangeUser} type='text' name='phone' placeholder='Номер телефона'
                       className='model__input' value={user.phone} autoComplete="off"/>
                <button onClick={handleChangeContact}>Изменить</button>
            </form>
        </div>
    );

};

const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);
export default storeEnhancer(ChangeContactForm);