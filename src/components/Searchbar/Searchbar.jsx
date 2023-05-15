import { SearchbarStyled, SearchForm, SubmitButton, SubmitButtonLabel, SearchFormInput } from './Searchbar.styled';
import { BsSearch } from "react-icons/bs";
import { toast } from "react-toastify";
import PropTypes from 'prop-types';
import { useState } from 'react';
    
const Searchbar = ({handleSearchbarSubmit}) => {
    const [searchText, setSearchText] = useState('');

    const handleSearchTextChange = event => {
       setSearchText(event.currentTarget.value.toLowerCase())
    }

    const handleSubmit = event => {
        event.preventDefault();
        if(searchText.trim() === '') {
            toast.warning("Please, type something to search for images or photos");
            return;
        }
        handleSearchbarSubmit(searchText);
    }

    return (
        <SearchbarStyled>
            <SearchForm onSubmit={handleSubmit}>
                <SubmitButton type="submit">
                    <BsSearch/>
                    <SubmitButtonLabel>
                    </SubmitButtonLabel>
                </SubmitButton>

                <SearchFormInput
                    type="text"
                    name="imageName"
                    value={searchText}
                    onChange={handleSearchTextChange}
                    autocomplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                </SearchForm>
        </SearchbarStyled>  
    )

}   

export default Searchbar;

Searchbar.propTypes = {
    handleSearchbarSubmit: PropTypes.func.isRequired,
}
