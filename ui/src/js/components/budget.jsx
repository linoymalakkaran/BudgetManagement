import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import styles from '../../css/style.css';
import { add, remove, update, fetchBudgetById, fetchBudgets, viewTransaction } from '../actions/budget.js';
import { switchView } from '../actions/view';
import { setMode, clearMode } from '../actions/mode.js';
import { CheckDecimal, validateForm, countErrors } from '../lib/validator.js';

class _Budget extends React.Component {
    constructor(props) {
        super(props);
        this.clearState = {
            Id: '',
            Name: '',
            MaxAmount: '',
            Description: '',
            CreatedDate: new Date().toLocaleDateString()
        };
        this.clearErrors = {
            Name: '',
            MaxAmount: '',
            Description: ''
        };
        this.state = {
            budgets: [],
            budget: this.clearState,
            formValid: false,
            errorCount: null,
            errors: this.clearErrors
        };
        this.handleChange = this.handleChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.addBudget = this.addBudget.bind(this);
        this.updateBudget = this.updateBudget.bind(this);
        this.editBudget = this.editBudget.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'Name':
                errors.Name =
                    value.length == 0
                        ? 'Budget name is required!'
                        : '';
                break;
            case 'MaxAmount':
                if (value == 0 || value == '' || value == undefined) {
                    errors.MaxAmount = 'Max Amount should not be zero!';
                } else if (!CheckDecimal(value)) {
                    errors.MaxAmount = 'Only numbers allowed!';
                } else {
                    errors.MaxAmount = '';
                }
                break;
            case 'Description':
                errors.Description =
                    value.length == 0
                        ? 'Description is required!'
                        : '';
                break;
            default:
                break;
        }

        this.setState(prevState => ({
            errors,
            budget: {
                ...prevState.budget,
                [name]: value
            }
        }))
    }

    clearForm() {
        this.setState({
            ...this.state.budget,
            budget: this.clearState,
            errors: this.clearErrors
        });
    }

    editBudget(budget) {
        this.setState({
            ...this.state.budget,
            budget: budget
        });
    }

    updateBudget() {
        let budgetToValidate = { ...this.state.transaction };
        delete budgetToValidate.Id;
        let isFormValid = validateForm(this.state.errors, budgetToValidate);
        let errorCount = countErrors(this.state.errors);
        this.setState({
            formValid: isFormValid,
            errorCount: errorCount
        });

        if (isFormValid && errorCount == 0) {
            this.props.updateBudget({ ...this.state.budget });
            this.clearForm();
        } else {
            this.props.showErrorMessage('Please provide valid data.');
        }
    }

    addBudget() {
        let budgetToValidate = { ...this.state.transaction };
        delete budgetToValidate.Id;
        let isFormValid = validateForm(this.state.errors, budgetToValidate);
        let errorCount = countErrors(this.state.errors);
        this.setState({
            formValid: isFormValid,
            errorCount: errorCount
        });

        if (isFormValid && errorCount == 0) {
            this.props.addBudget({ ...this.state.budget });
            this.clearForm();
        } else {
            this.props.showErrorMessage('Please provide valid data.');
        }
    }

    render() {
        const { errors, formValid } = this.state;
        return (
            <div>
                <div className="form">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-12">
                                    <label>
                                        <input name="Id"
                                            onChange={this.handleChange}
                                            type="hidden" className="form-control" value={this.state.budget.Id} />
                                        Budget Name *:
                                        <input name="Name"
                                            onChange={this.handleChange}
                                            type="text" className="form-control" value={this.state.budget.Name} />
                                        {errors.Name.length > 0 &&
                                            <span className={styles.error}>{errors.Name}</span>}
                                    </label>
                                </div>
                                <div className="col-sm-12">
                                    <label>
                                        Max Amount *:
                                    <input name="MaxAmount"
                                            onChange={this.handleChange}
                                            type="text" className="form-control" value={this.state.budget.MaxAmount} />
                                        {errors.MaxAmount.length > 0 &&
                                            <span className={styles.error}>{errors.MaxAmount}</span>}
                                    </label>
                                </div>
                                <div className="col-sm-6"></div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <label>
                                Description *:
                            <textarea name="Description"
                                    onChange={this.handleChange}
                                    type="text" value={this.state.budget.Description} className="form-control desc-input" />
                                {errors.Description.length > 0 &&
                                    <span className={styles.error}>{errors.Description}</span>}
                            </label>
                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-12">
                                    <label className="pt-2 m-0 mb-4">
                                        Created Date:
                                    <input name="CreatedDate"
                                            disabled={true}
                                            onChange={this.handleChange}
                                            type="text" value={this.state.budget.CreatedDate} className="form-control" />
                                    </label>
                                </div>

                                <div className="col-sm-12">
                                    <button onClick={this.addBudget} className="btn btn-outline-primary mr-3"> Add</button>


                                    <button onClick={() => {
                                        this.updateBudget(this.state.budget);
                                        this.clearForm();
                                    }
                                    } className="btn btn-outline-info mr-3">Update</button>

                                    <button onClick={
                                        () => {
                                            this.clearForm();
                                            this.props.switchMode();
                                        }
                                    } className="btn btn-outline-secondary">
                                        Clear
                                        </button>
                                </div>
                            </div>

                        </div>
                    </div>


                    <br /><br />

                </div>
                <hr />
                <div className="result">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Budget Name</th>
                                <th>Max Amount</th>
                                <th>Description</th>
                                <th>Created Date</th>
                                <th>UpdatedDate</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (this.props.budgets) ? (this.props.budgets.map((budgetItem, index) => {
                                    return (
                                        <tr key={budgetItem.Id}>
                                            <td>{index + 1}</td>
                                            <td>{budgetItem.Name}</td>
                                            <td>{budgetItem.MaxAmount}</td>
                                            <td>{budgetItem.Description}</td>
                                            <td>{budgetItem.CreatedDate}</td>
                                            <td>{budgetItem.UpdatedDate}</td>
                                            <td>
                                                <button className="btn btn-outline-warning px-3 py-0 mr-1"
                                                    onClick={() => {
                                                        this.editBudget(budgetItem);
                                                        this.props.switchMode('edit');
                                                    }}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-outline-danger px-3 py-0 mr-1"
                                                    onClick={
                                                        () => {
                                                            this.props.removeBudget(budgetItem.Id);
                                                        }
                                                    }>
                                                    Delete
                                                </button>
                                                <button className="btn btn-outline-dark px-3 py-0"
                                                    onClick={
                                                        () => {
                                                            this.props.viewtransactions(budgetItem);
                                                        }
                                                    }>
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })) : null
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    // console.log(state);
    return {
        budgets: state.budget.budgets,
        mode: state.budget.mode
    };
}

function mapDispatchToProps(dispatch) {
    return ({
        addBudget: function (budget) {
            dispatch(add(budget));
        },
        updateBudget: function (budget) {
            dispatch(update(budget));
        },
        switchMode: function (mode) {
            if (mode) {
                dispatch(setMode(mode));
            } else {
                dispatch(clearMode());
            }
        },
        removeBudget: function (Id) {
            dispatch(remove(Id));
        },
        showSuccessMessage: function (text) {
            alert(text);
        },
        showErrorMessage: function (text) {
            alert(text);
        },
        searchBudget: function (budget) {
            dispatch(fetchBudgetById(budget));
        },
        fetchBudgets: function () {
            dispatch(fetchBudgets());
        },
        viewtransactions: function (budget) {
            dispatch(viewTransaction(budget));
            dispatch(switchView('transaction'));
        }
    });
}

const Budget = connect(mapStateToProps, mapDispatchToProps)(_Budget);

export default Budget;