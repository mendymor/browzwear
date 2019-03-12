import React, { Component } from 'react';
import groupBy from 'lodash/groupBy';
import { Countries, Cities, Company, Map } from './components/index.js';
import { Customers } from './data/clients';
import './app.css';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countries: [],
            cities: [],
            companies: [],
            address: null
        };

        this.GetCompanies = this.GetCompanies.bind(this);
        this.GetCities = this.GetCities.bind(this);
        this.GetCountries = this.GetCountries.bind(this);
        this.handleCountryClick = this.handleCountryClick.bind(this);
        this.handleCityClick = this.handleCityClick.bind(this);
        this.handleCompanyClick = this.handleCompanyClick.bind(this);

        this.Customers = Customers;
    }

    componentDidMount() {
        // initial the state with all countries as default
        this.setState({ countries: this.GetCountries() })
    }

    handleCountryClick(country, updateCompanies) {
        // update the list of cities and companies when a country selected
        this.setState({ cities: this.GetCities(country) }, updateCompanies ?
            this.setState({
                companies: [].concat.apply([], this.GetCities(country).map(c => this.GetCompanies(c)))
            }) : null
        );
    }

    handleCityClick(city) {
        // update the list of companies when a country selected
        this.setState({
            companies: this.GetCompanies(city)
        });
    }

    handleCompanyClick(company) {
        // update the map address when a company selected
        const customer = this.Customers.find(c => c.CompanyName === company);
        this.setState({ address: `${customer.Address} ${customer.City} ${customer.Country}` });
    }

    sortObjectProperties(obj) {
        var sortableObject=[];

        // convert obj to array
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                sortableObject.push([prop, obj[prop]]);
            }
        }

        // sort array by properties count
        sortableObject.sort(function(a, b) {
            if (a[1].length < b[1].length) return 1;
            if (a[1].length > b[1].length) return -1;
            return 0;
        });

        return sortableObject;
    }

    GetCompanies(city) {
        // get the companies with/without filter by city and sort by name
        if (city) {
            return this.Customers.filter(c => c.City === city).map(c => c.CompanyName).sort();
        } else {
            return this.Customers.map(c => c.CompanyName).sort();
        }
    }

    GetCities(country) {
        // get the cities with/without filter by country and sort by count of companies
        if (country) {
            return this.sortObjectProperties(groupBy(this.Customers.filter(c => c.Country === country), "City")).map(c => c[0]);
        } else {
            return this.sortObjectProperties(groupBy(this.Customers, "City")).map(c => c[0]);
        }
    }

    GetCountries() {
        // get the countries and sort by count of cities
        return this.sortObjectProperties(groupBy(this.Customers, "Country")).map(c => c[0]);
    }

    render() {
        return (
            <div className="app">
                <div className="content">
                    <Countries
                        countries={this.state.countries}
                        onClick={this.handleCountryClick}/>
                    <Cities
                        cities={this.state.cities}
                        onClick={this.handleCityClick}/>
                    <Company
                        companies={this.state.companies}
                        onClick={this.handleCompanyClick}/>
                    <Map address={this.state.address}/>
                </div>
            </div>
        );
    }
}
