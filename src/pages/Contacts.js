import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import syncAuth from "../api/syncAuth";
import './contacts.scss'
import {getContactsAxios, deleteContactAxios} from "../store/reducers/contacts/action";
import AddContactForm from "../components/AddContactForm/AddContactForm";
import ChangeContactForm from "../components/ChangeContactForm/ChangeContactModal";
import SearchContact from "../components/SearchContact/SearchContact";
import {getContacts} from "../store/reducers/contacts/getters";
import {getUserId} from "../store/reducers/auth/getters";
import ContactsItem from "../components/ContactsItem/ContactsItem";
import ContainerModal from "../components/ContainerModal/ContainerModal";
import {useHistory} from "react-router-dom";
import {setIsAuth} from "../store/reducers/auth/action";


const mapStateToProps = (state) => {
    return {
        contacts: getContacts(state),
        userId: getUserId(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getContactsAxios: (id) => dispatch(getContactsAxios(id)),
        deleteContactAxios: (userId, contactId) => dispatch(deleteContactAxios(userId, contactId)),
        setIsAuth:() => dispatch(setIsAuth())
    };
};

const Contacts = (props) => {
    const history = useHistory()
    const [searchValue, setSearchValue] = useState('');

    const {userId, getContactsAxios} = props
    useEffect(() => {
        if (userId) {
            getContactsAxios(userId)
        }
    }, [userId, getContactsAxios])


    const [addContactModalIsOpen, setAddContactModalIsOpen] = useState(false);

    function openAddContactModal() {
        setAddContactModalIsOpen(true);
    }

    function closeAddContactModal() {
        setAddContactModalIsOpen(false);

    }

    const [changeContactModalIsOpen, setChangeContactModalIsOpen] = useState(false);
    const [changeContactID, setChangeContactID] = useState('');

    function openChangeContactModal(e) {
        setChangeContactID(e.target.id)
        setChangeContactModalIsOpen(true);

    }

    function closeChangeContactModal() {
        setChangeContactModalIsOpen(false);

    }

    const deleteContact = (e) => {
        props.deleteContactAxios(props.userId, e.target.id);
    }


    const filteredContacts = props.contacts.filter((contact) =>
        contact.firstName.includes(searchValue) ||
        contact.lastName.includes(searchValue) ||
        contact.phone.includes(searchValue)
    )

    const unLogin = () => {
        localStorage.removeItem('accessToken')
        props.setIsAuth()
        history.push('/login')

    }

    return (
        <div className='contacts__body'>
            <div className='contacts__header'>
                <button className='contacts__btn' onClick={openAddContactModal}>Добавить Контакт</button>
                <div>
                    <SearchContact
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    >
                    </SearchContact>
                </div>
                <button className='contacts__btn' onClick={unLogin}>Разлогиниться</button>
            </div>



            <ContainerModal
                modalIsOpen={addContactModalIsOpen}
                closeModal={closeAddContactModal}
            >

                <AddContactForm
                    onSave={closeAddContactModal}
                >
                </AddContactForm>

            </ContainerModal>
            <ContainerModal
                modalIsOpen={changeContactModalIsOpen}
                closeModal={closeChangeContactModal}
            >
                <ChangeContactForm
                    contactId={changeContactID}
                    onChange={closeChangeContactModal}>
                </ChangeContactForm>
            </ContainerModal>
            <div className='contacts__list'>
                {(!filteredContacts)
                    ? <div>Нет контактов</div>
                    : filteredContacts.map(contact => {
                        return <ContactsItem
                            key={contact.id}
                            contact={contact}
                            openChangeContactModal={openChangeContactModal}
                            deleteContact={deleteContact}>
                        </ContactsItem>
                    })
                }
            </div>
        </div>
    );
}


const storeEnhancer = connect(mapStateToProps, mapDispatchToProps);
export default storeEnhancer(syncAuth(Contacts));