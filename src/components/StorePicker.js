import React from 'react';

import "../css/style.css";

class StorePicker extends React.Component {
    render () {
        return (
        <form className="store-selector">
            <h2> Please eneter a store</h2>
            <input type="text" required placeholder="Store Name" />
            <button type="submit"> Visit Store-> </button>
        </form>
        )
    }
}

export default StorePicker;