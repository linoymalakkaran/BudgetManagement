import React from 'react';
import ReactDOM from 'react-dom';

import styles from '../../css/style.css';

import Header from './header.jsx';
import Body from './body.jsx';

function App(props) {
    return (
        [
            <Header key="1001" />,
            <Body key="1002" />
        ]
    );
}

export default App;