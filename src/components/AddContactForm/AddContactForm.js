import React, {useState} from 'react';
import {addContactAxios} from "../../store/reducers/contacts/action";
import {connect} from "react-redux";
import {getUserId} from "../../api/api";

const mapStateToProps = (state) => {
    return {
        userId: getUserId(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addContactAxios: (user, userId) => dispatch(addContactAxios(user, userId))
    };
};


const AddContactForm = (props) => {

    const [user, setUser] = useState({firstName: '', lastName: '', phone: ''})

    const handleChangeUser = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name]: value})
    }

    const handleAddContact = (e) => {
        e.preventDefault()
        props.addContactAxios(user, props.userId).then(props.onSave)
    }

    return (
        <div className='modal__form-wrapper'>
            <div>Добавить Контакт</div>
            <form className='modal__form' onSubmit={handleAddContact}>
                <input onChange={handleChangeUser} type='text' name='firstName' placeholder='Имя'
                       className='model__input' value={user.firstName} autoComplete="off"/>
                <input onChange={handleChangeUser} type='text' name='lastName' placeholder='Фамилия'
                       className='model__input' value={user.lastName} autoComplete="off"/>
                <input onChange={handleChangeUser} name='phone' placeholder='Номер телефона' className='model__input'
                       value={user.phone} autoComplete="off"/>
                <button onClick={handleAddContact}>Добавить</button>
            </form>
        </div>
    );

};

const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);
export default storeEnhancer(AddContactForm);
