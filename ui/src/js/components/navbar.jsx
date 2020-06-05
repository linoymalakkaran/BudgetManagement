import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import styles from '../../css/style.css';

import { switchView } from '../actions/view.js';

function _Navbar(props) {
    return (
        <ul className={styles['navbar-ul']}>
            <li onClick={(e) => { props.selectView('budget'); }}
                className={[styles['navbar-li', 'inline-display'],
                (props.view === 'budget') ? styles['navbar-li-selected'] : ''].join(' ')}>Budgets</li>
            <li onClick={(e) => { props.selectView('transaction'); }}
                className={[styles['navbar-li', 'inline-display-avoid-clicks'],
                (props.view === 'transaction') ? styles['navbar-li-selected'] : ''].join(' ')}>Transactions</li>
        </ul>
    )
}

function mapStateToProps(state) {
    return { view: state.view };
}

function mapDispatchToProps(dispatch) {
    return ({
        selectView: function (view) {
            dispatch(switchView(view));
        }
    });
}


const Navbar = connect(mapStateToProps, mapDispatchToProps)(_Navbar);

export default Navbar;