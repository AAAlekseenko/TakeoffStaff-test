import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import syncAuth from "../assets/checkAuth";
import './contacts.scss'
import {getContactsAxios, deleteContactAxios} from "../store/reducers/contacts/action";
import ContainerModal from "../components/ContainerModal";
import AddContactForm from "../components/AddContactForm/AddContactForm";
import ChangeContactForm from "../components/ChangeContactForm/ChangeContactModal";
import SearchContact from "../components/SearchContact/SearchContact";
import {getContacts} from "../store/reducers/contacts/getters";
import {getUserId} from "../store/reducers/auth/getters";
import ContactsItem from "../components/ContactsItem/ContactsItem";


const mapStateToProps = (state) => {
    return {
        contacts: getContacts(state),
        userId: getUserId(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getContactsAxios: (id) => dispatch(getContactsAxios(id)),
        deleteContactAxios: (userId, contactId) => dispatch(deleteContactAxios(userId, contactId))
    };
};

const Contacts = (props) => {

    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        if (props.userId) {
            props.getContactsAxios(props.userId)
        }
    }, [props.userId])


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

    function closeChangeContactModal(e) {
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

    return (
        <div>
            <SearchContact
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            >
            </SearchContact>
            <button onClick={openAddContactModal}>Добавить Контакт</button>
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
            <div>
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