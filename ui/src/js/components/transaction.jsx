import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import styles from '../../css/style.css';

import { add, remove, update, fetchTransactionsByBudgetId, clearTransactions } from '../actions/transaction.js';
import { setMode, clearMode } from '../actions/mode.js';
import { CheckDecimal, validateForm, countErrors } from '../lib/validator.js';

class _Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.clearState = {
            Id: '',
            Type: '',
            Amount: '',
            Currency: 'AED',
            PaidTo: '',
            CategoryId: '',
            Notes: '',
            BudgetId: '',
            CreatedDate: new Date().toLocaleDateString(),
            UpdatedDate: new Date().toLocaleDateString()
        };
        this.clearErrors = {
            Type: '',
            Amount: '',
            Currency: '',
            PaidTo: '',
            CategoryId: '',
            BudgetId: '',
        };
        this.state = {
            transactions: [],
            transaction: this.clearState,
            categories: [],
            budgets: [],
            formValid: false,
            errorCount: null,
            errors: this.clearErrors
        };
        this.handleChange = this.handleChange.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.addTransaction = this.addTransaction.bind(this);
        this.updateTransaction = this.updateTransaction.bind(this);
        this.editTransaction = this.editTransaction.bind(this);
    }

    async componentDidMount() {
        const categories = (await axios.get(`${REST_URL_BASE}/looksups/get_categories`)).data.data;
        this.setState({
            categories,
            budgets: this.props.budgets
        });

        let selectedBudget = this.props.selectedBudget;
        if (selectedBudget && selectedBudget.Id) {
            this.setState({
                transaction: Object.assign({}, this.state.transaction, { BudgetId: selectedBudget.Id })
            });
            this.props.fetchTransactionsByBudgetId(selectedBudget.Id);
        }
    }

    handleChange(event) {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;
        switch (name) {
            case 'Type':
                errors.Type =
                    value.length == 0
                        ? 'transaction Type name is required!'
                        : '';
                break;
            case 'Amount':
                let totalamountUtilized = this.state.transactions.sum('Amount') + value;
                if (value == 0 || value == '' || value == undefined) {
                    errors.Amount = 'Amount should not be zero!';
                } else if (!CheckDecimal(value)) {
                    errors.Amount = 'Only numbers allowed!';
                } else if (this.props.selectedBudget.MaxAmount < totalamountUtilized) {
                    errors.Amount = 'Your maximum allowed limit exceed!';
                }
                else {
                    errors.Amount = '';
                }
                break;
            case 'Currency':
                errors.Currency =
                    value.length == 0
                        ? 'Please select a currency type!'
                        : '';
                break;
            case 'PaidTo':
                errors.PaidTo =
                    value.length == 0
                        ? 'PaidTo is required!'
                        : '';
                break;
            case 'BudgetId':
                this.props.clearTransactions();
                if (this.props.selectedBudget) {
                    this.props.fetchTransactionsByBudgetId(value);
                }
                errors.BudgetId =
                    value.length == 0
                        ? 'Please select a budget!'
                        : '';
                break;
            default:
                break;
        }

        this.setState(prevState => ({
            errors,
            transaction: {
                ...prevState.transaction,
                [name]: value
            }
        }))
    }

    clearForm() {
        this.setState({
            ...this.state.transaction,
            transaction: this.clearState,
            errors: this.clearErrors
        });
    }

    editTransaction(transaction) {
        this.setState({
            ...this.state.transaction,
            transaction: transaction
        });
    }

    updateTransaction() {
        let isFormValid = validateForm(this.state.errors, this.state.transaction);
        let errorCount = countErrors(this.state.errors);
        this.setState({
            formValid: isFormValid,
            errorCount: errorCount
        });

        if (isFormValid && errorCount == 0) {
            this.props.updateTransaction({ ...this.state.transaction });
            this.clearForm();
        } else {
            this.props.showErrorMessage('Please provide valid data.');
        }
    }

    addTransaction() {
        let transactionToValidate = { ...this.state.transaction };
        delete transactionToValidate.Id;
        delete transactionToValidate.Notes;
        let isFormValid = validateForm(this.state.errors, transactionToValidate);
        let errorCount = countErrors(this.state.errors);
        this.setState({
            formValid: isFormValid,
            errorCount: errorCount
        });

        if (isFormValid && errorCount == 0) {
            this.props.addTransaction({ ...this.state.transaction });
            this.clearForm();
        } else {
            this.props.showErrorMessage('Please provide valid data.');
        }
    }

    getBudgetNameById = (budgetId) => {
        let budgetArray = this.props.budgets.filter((budgetItem) => {
            return budgetItem.Id == budgetId;
        });
        return budgetArray.length > 0 ? budgetArray[0].Name : null;
    }

    getCategoryNameById = (categoryId) => {
        let categoryArray = this.state.categories.filter((categoryItem) => {
            return categoryItem.Id == categoryId;
        });

        return categoryArray.length > 0 ? categoryArray[0].Name : null;
    }

    render() {

        const { categories, budgets, errors, formValid } = this.state;

        let categoriesList = categories.length > 0
            && categories.map((item, i) => {
                return (
                    <option key={i} value={item.Id}>{item.Name}</option>
                )
            }, this);
        categories.length > 0
            && categoriesList.unshift(<option key={-1} value={-1}>{'-- Select Category --'}</option>);


        let budgetsList = budgets.length > 0
            && budgets.map((item, i) => {
                return (
                    <option key={i} value={item.Id}>{item.Name}</option>
                )
            }, this);
        budgets.length > 0
            && budgetsList.unshift(<option key={-1} value={-1}>{'-- Select Category --'}</option>);

        // id, Name, Name...etc
        return (
            <div>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="row">
                            <div className="col-sm-12">
                                <label>
                                    Select Budget *:
                                    <select name="BudgetId" className="form-control"
                                        onChange={this.handleChange}
                                        value={this.state.transaction.BudgetId}>
                                        {budgetsList}
                                    </select>
                                    {errors.BudgetId.length > 0 &&
                                        <span className={styles.error}>{errors.BudgetId}</span>}
                                </label>
                            </div>
                            <div className="col-sm-12">
                                <label>
                                    Transaction Type *:
                                    <input name="Type" className="form-control"
                                        onChange={this.handleChange}
                                        type="text" value={this.state.transaction.Type} />
                                    {errors.Type.length > 0 &&
                                        <span className={styles.error} className={styles.error}>{errors.Type}</span>}
                                </label>
                            </div>

                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="row">
                            <div className="col-sm-12">
                                <label>
                                    Category *:
                                    <select name="CategoryId" className="form-control"
                                        onChange={this.handleChange}
                                        value={this.state.transaction.CategoryId}>
                                        {categoriesList}
                                    </select>
                                    {errors.CategoryId.length > 0 &&
                                        <span className={styles.error}>{errors.CategoryId}</span>}
                                </label>
                            </div>
                            <div className="col-sm-12">
                                <label>
                                    Amount *:
                                    <input name="Amount" className="form-control"
                                        onChange={this.handleChange}
                                        type="text" value={this.state.transaction.Amount} />
                                    {errors.Amount.length > 0 &&
                                        <span className={styles.error}>{errors.Amount}</span>}
                                </label>
                            </div>

                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="row">
                            <div className="col-sm-12">
                                <label>
                                    Currency *:
                                    <select name="Currency" className="form-control"
                                        onChange={this.handleChange}
                                        value={this.state.transaction.Currency} >
                                        <option value="AED">AED</option>
                                        <option value="USD">USD</option>
                                    </select>
                                    {errors.Currency.length > 0 &&
                                        <span className={styles.error}>{errors.Currency}</span>}
                                </label>
                            </div>
                            <div className="col-sm-12">
                                <label>
                                    Paid To *:
                                    <input name="PaidTo" className="form-control"
                                        onChange={this.handleChange}
                                        type="text" value={this.state.transaction.PaidTo} />
                                    {errors.PaidTo.length > 0 &&
                                        <span className={styles.error}>{errors.PaidTo}</span>}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="row">
                            <div className="col-sm-12">
                                <label>
                                    Notes:
                                    <textarea name="Notes" className="form-control"
                                        onChange={this.handleChange}
                                        type="text" value={this.state.transaction.Notes} />
                                </label>
                            </div>
                            <div className="col-sm-12">
                                <label>
                                    Created Date: {this.state.transaction.CreatedDate}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form">

                    <br /><br />
                    <div className={styles.actiongroup}>
                        <button onClick={this.addTransaction} className="btn btn-outline-primary mr-3" >Add</button>
                        <button onClick={() => {
                            this.updateTransaction(this.state);
                            this.clearForm();
                        }
                        } className="btn btn-outline-info mr-3" >Update</button>
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
                <hr />
                <div className="result">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Sl No</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Currency</th>
                                <th>Paid To</th>
                                <th>Category</th>
                                <th>Notes</th>
                                <th>Budget Id</th>
                                <th>Created Date</th>
                                <th>Updated Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                (this.props.transactions) ? (this.props.transactions.map((transItem, index) => {
                                    return (
                                        <tr key={transItem.Id}>
                                            <td>{index + 1}</td>
                                            <td>{transItem.Type}</td>
                                            <td>{transItem.Amount}</td>
                                            <td>{transItem.Currency}</td>
                                            <td>{transItem.PaidTo}</td>
                                            <td>{this.getCategoryNameById(transItem.CategoryId)}</td>
                                            <td>{transItem.Notes}</td>
                                            <td>{this.getBudgetNameById(transItem.BudgetId)}</td>
                                            <td>{transItem.CreatedDate}</td>
                                            <td>{transItem.UpdatedDate}</td>
                                            <td>
                                                <button className="btn btn-outline-warning px-3 py-0 mr-1"
                                                    onClick={() => {
                                                        this.editTransaction(transItem);
                                                        this.props.switchMode('edit');
                                                    }}>
                                                    Edit
                                                </button>
                                                <button className="btn btn-outline-danger px-3 py-0 mr-1"
                                                    onClick={
                                                        () => {
                                                            this.props.removeTransaction(transItem.Id);
                                                        }
                                                    }>
                                                    Delete
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
    return {
        transactions: state.transaction.transactions,
        mode: state.transaction.mode,
        selectedBudget: state.budget.selectedBudget,
        budgets: state.budget.budgets
    };
}

function mapDispatchToProps(dispatch) {
    return ({
        addTransaction: function (transaction) {
            dispatch(add(transaction));
        },
        updateTransaction: function (transaction) {
            dispatch(update(transaction));
        },
        switchMode: function (mode) {
            if (mode) {
                dispatch(setMode(mode));
            } else {
                dispatch(clearMode());
            }
        },
        removeTransaction: function (id) {
            dispatch(remove(id));
        },
        showSuccessMessage: function (text) {
            alert(text);
        },
        showErrorMessage: function (text) {
            alert(text);
        },
        searchTransaction: function (transaction) {
            dispatch(fetchTransaction(transaction));
        },
        fetchTransactionsByBudgetId: function (Id) {
            dispatch(fetchTransactionsByBudgetId(Id));
        },
        clearTransactions: function () {
            dispatch(clearTransactions());
        }
    });
}

const Transaction = connect(mapStateToProps, mapDispatchToProps)(_Transaction);


export default Transaction;