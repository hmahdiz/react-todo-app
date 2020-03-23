import React from 'react';
import './filter.css';

const Filter = function (props) {
    return (
        <button className={"todo-filter " + (props.selected ? "selected" : "")}
            onClick={props.onFilterClick}>{props.name}</button>
    );
}

export default Filter;