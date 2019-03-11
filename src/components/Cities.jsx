import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '../utils/List';
import './cities.css';

export default class Cities extends Component {
    constructor(props) {
        super(props);

        this.state = { selected: null };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        // at first time select the first city
        if (prevProps.cities.length === 0) {
            this.setState({ selected: this.props.cities[0] });
        } else if (this.props.cities !== prevProps.cities) {
            this.setState({ selected: null });
        }
    }

    handleClick(city) {
        // update the selected city and call to props func
        this.setState({ selected: city }, this.props.onClick(city));
    }

    render() {
        return (
            <div className="cities">
                <div className="title">
                    Cities
                </div>
                <List
                    listItems={this.props.cities}
                    selectedItem={this.state.selected}
                    onClick={this.handleClick}/>
            </div>
        );
    }
}
