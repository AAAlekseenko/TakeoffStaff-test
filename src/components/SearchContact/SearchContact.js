import React from 'react';

const SearchContact = (props) => {
    const changeSearchValue = (e) => {
        props.setSearchValue(e.target.value)
    }



    return (
        <div>
            <input name='search' onChange={changeSearchValue} value={props.searchValue} autoComplete="off"/>
        </div>
    );
};

export default SearchContact;