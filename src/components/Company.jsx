import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List from '../utils/List';
import './company.css';

export default class Company extends Component {
    constructor(props) {
        super(props);

        this.state = { selected: null };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate(prevProps) {
        // at first time select the first company
        if (this.props.companies !== prevProps.companies && prevProps.companies.length === 0) {
            const firstCompany = this.props.companies[0];
            this.handleClick(firstCompany);
        } else if (this.props.companies !== prevProps.companies) {
            this.setState({ selected: null });
        }
    }

    handleClick(company) {
        // update the selected company and call to props func
        this.setState({ selected: company }, this.props.onClick(company));
    }

    render() {
        return (
            <div className="company">
                <div className="title">
                    Company
                </div>
                <List
                    listItems={this.props.companies}
                    selectedItem={this.state.selected}
                    onClick={this.handleClick}/>
            </div>
        );
    }
}
