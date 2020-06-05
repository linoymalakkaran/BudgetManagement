import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import styles from '../../css/style.css';
import Transaction from './transaction.jsx';
import Budget from './budget.jsx';
import { fetchBudgets } from '../actions/budget';

class _Body extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let el = null;
        switch (this.props.view) {
            case 'transaction': {
                el = <Transaction />;
                break;
            }
            case 'budget': {
                el = <Budget />;
                break;
            }
            default: {
                el = <Budget />;
            }

        }
        return (
            <div>
                {
                    el
                }
            </div>
        )
    }

    componentDidMount() {
        this.props.getData(this.props.view);
    }

}

function mapStateToProps(state) {
    return { view: state.view };
}

function mapDispatchToProps(dispatch) {
    return ({
        getData: function (type) {
            switch (type) {
                case 'budget': {
                    dispatch(fetchBudgets());
                    break;
                }
                default:
                    console.log('No type passed');
            }
        }
    });
}

const Body = connect(mapStateToProps, mapDispatchToProps)(_Body);

export default Body;