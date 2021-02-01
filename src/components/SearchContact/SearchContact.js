import React from 'react';
import './searchContact.scss'

const SearchContact = (props) => {
    const changeSearchValue = (e) => {
        props.setSearchValue(e.target.value)
    }

    return (
        <div >
            <label className='search-contact__wrapper'>
                Поиск по Контактам
                <input className='search-contact__input' name='search' onChange={changeSearchValue}
                       value={props.searchValue} autoComplete="off"/>
            </label>
        </div>
    );
};

export default SearchContact;