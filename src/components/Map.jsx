import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './map.css';

export default class Map extends Component {
    render() {
        // get the full map src
        const src = `https://maps.google.com/maps?q=${this.props.address}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

        return (
            <div className="map">
                <div className="title">
                    Map
                </div>
                <div className="frame">
                    <iframe
                        width='320'
                        height='199'
                        frameBorder='0'
                        src={src} />
                </div>
            </div>
        );
    }
}
