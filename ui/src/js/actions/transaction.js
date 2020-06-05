import fetch from 'isomorphic-fetch';

import {
    UPDATE_TRANSACTION_ID,
    UPDATE_TRANSACTION,
    REMOVE_TRANSACTION,
    RECEIVE_TRANSACTIONS
} from './types.js';


export function add(transaction) {
    return function (dispatch) {
        let form = new FormData();
        form.append("transaction", JSON.stringify(transaction));
        fetch(`${REST_URL_BASE}/transaction/add`, {
            method: 'POST',
            body: form
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.status && json.status.toLowerCase() === 'ok') {
                transaction.Id = json.data;
                transaction.UpdatedDate = new Date().toLocaleDateString();
                dispatch(updateTransactionId(transaction));
            } else {
                console.log(json);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function updateTransactionId(transaction) {
    return ({
        type: UPDATE_TRANSACTION_ID,
        payload: {
            data: transaction
        }
    });
}

export function update(transaction) {
    return function (dispatch) {
        let form = new FormData();
        form.append("transaction", JSON.stringify(transaction));
        fetch(`${REST_URL_BASE}/transaction/update`, {
            method: 'POST',
            body: form
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.status && json.status.toLowerCase() === 'ok') {
                dispatch(updateTransaction(transaction));
            } else {
                console.log(json);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function updateTransaction(transaction) {
    return ({
        type: UPDATE_TRANSACTION,
        payload: {
            data: transaction
        }
    });
}


export function fetchTransactionsByBudgetId(Id) {
    return function (dispatch) {
        fetch(`${REST_URL_BASE}/transaction/by_budget_id/${Id}`, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.status && json.status.toLowerCase() === 'ok') {
                dispatch(receiveTransactionsByBudgetId(json.data));
            } else {
                console.log(json);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function receiveTransactionsByBudgetId(transactions) {
    return ({
        type: RECEIVE_TRANSACTIONS,
        payload: {
            data: transactions
        }
    });
}


export function clearTransactions() {
    return ({
        type: RECEIVE_TRANSACTIONS,
        payload: {
            data: []
        }
    });
}


export function remove(Id) {
    return function (dispatch) {
        fetch(`${REST_URL_BASE}/transaction/delete/${Id}`, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.status && json.status.toLowerCase() === 'ok') {
                dispatch(removeTransaction(Id));
            } else {
                console.log(json);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function removeTransaction(Id) {
    return ({
        type: REMOVE_TRANSACTION,
        payload: {
            data: Id
        }
    });
}