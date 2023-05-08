import React from "react";
import {useState } from "react";
import PropTypes from 'prop-types';

import '../styles.css'



export default function Searchbar({priSubmit}) {
    const [searchName, setSearchName] = useState('');
    const handleInput = e => {
        setSearchName(e.currentTarget.value.toLowerCase());
        
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
       
        if (searchName.trim() === '') {
            alert('Please enter name for search');            
            return;
        }
       
        priSubmit(searchName);
        
        setSearchName('');
        
    }
    return (
        <header className="Searchbar">
            <form onSubmit={handleSubmit } className="SearchForm ">
                <button type="submit" className="SearchForm-button">
                    <span >Search</span>
                </button>

                <input
                    onChange={handleInput}
                    className="SearchForm-input "
                    type="text"
                    value={searchName}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                
            </form>
        </header>
    )
} 

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}