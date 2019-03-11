import React, { Component } from 'react';
import './list.css';

export default class List extends Component {
    render() {
        // get the current item selected
        const selected = this.props.selectedItem;
        const items = this.props.listItems.map((item, i) =>
            <div
                className={item === selected ? 'itemSelected' : 'item'}
                key={i}
                onClick={() => this.props.onClick(item)}>
                {item}
            </div>
        );

        return (
            <div className='list'>
                {items}
            </div>
        );
    }
}
