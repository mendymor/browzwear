import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '../utils/List';
import './countries.css';

export default class Countries extends Component {
    constructor(props) {
        super(props);

        this.state = { selected: null };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        // at first time select the first country
        if (prevProps.countries.length === 0) {
            this.setState({ selected: this.props.countries[0] });
        }
    }

    handleClick(country) {
        // update the selected country and call to props func
        this.setState({ selected: country }, this.props.onClick(country));
    }

    render() {
        return (
            <div className="countries">
                <div className="title">
                    Countries
                </div>
                <List
                    listItems={this.props.countries}
                    selectedItem={this.state.selected}
                    onClick={this.handleClick}/>
            </div>
        );
    }
}
