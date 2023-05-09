import React, { Component } from "react";
import PropTypes from 'prop-types';

import '../styles.css'

// import './Searchbar.css'


class Searchbar extends Component { 
    state = {
        searchName: '',
    }
    handleInput = e => {
        this.setState({ searchName: e.currentTarget.value.toLowerCase() })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.searchName.trim() === '') {
            alert('Please enter name for search');            
            return;
        }
        this.props.onSubmit(this.state.searchName);
        // console.log("searshName при сабмите", this.state.searshName);
        this.setState ({ searchName: '' });
    }
    render() {
        console.log("searshName в рендері", this.state.searshName);
    return (
        <header className="Searchbar">
            <form onSubmit={this.handleSubmit } className="SearchForm ">
                <button type="submit" className="SearchForm-button">
                    <span >Search</span>
                </button>

                <input
                    onChange={this.handleInput}
                    className="SearchForm-input "
                    type="text"
                    value={this.state.searchName}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                
            </form>
        </header>
    )
}
}
export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}