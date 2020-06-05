import fetch from 'isomorphic-fetch';

import {
    FETCH_BUDGET,
    UPDATE_BUDGET_ID,
    FETCH_BUDGETS,
    UPDATE_BUDGET,
    REMOVE_BUDGET,
    SET_BUDGET_FOR_TRANS_VIEW
} from './types.js';

import { buildBudgetQuery } from '../lib/query.builder.js';

export function add(budget) {
    return function (dispatch) {
        let form = new FormData();
        form.append("budget", JSON.stringify(budget));
        fetch(`${REST_URL_BASE}/budget/add`, {
            method: 'POST',
            body: form
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.status && json.status.toLowerCase() === 'ok') {
                budget.Id = json.data;
                budget.UpdatedDate = new Date().toLocaleDateString();
                dispatch(updateBudgetId(budget));
            } else {
                console.log(json);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function updateBudgetId(budget) {
    return ({
        type: UPDATE_BUDGET_ID,
        payload: {
            data: budget
        }
    });
}

export function update(budget) {
    return function (dispatch) {
        let form = new FormData();
        form.append("budget", JSON.stringify(budget));
        fetch(`${REST_URL_BASE}/budget/update`, {
            method: 'POST',
            body: form
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.status && json.status.toLowerCase() === 'ok') {
                dispatch(updateBudget(budget));
            } else {
                console.log(json);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function updateBudget(budget) {
    return ({
        type: UPDATE_BUDGET,
        payload: {
            data: budget
        }
    });
}

export function fetchBudgetById(budget) {
    return function (dispatch) {
        fetch(`${REST_URL_BASE}/budget/get_budget_by_id/:Id`, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.status && json.status.toLowerCase() === 'ok') {
                dispatch(receiveBudget(json.data));
            } else {
                console.log(json);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function receiveBudget(budget) {
    return ({
        type: FETCH_BUDGET,
        data: budget
    });
}

export function fetchBudgets() {
    return function (dispatch) {
        fetch(`${REST_URL_BASE}/budget/all`, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.status && json.status.toLowerCase() === 'ok') {
                dispatch(receiveBudgets(json.data));
            } else {
                console.log(json);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function receiveBudgets(budgets) {
    return ({
        type: FETCH_BUDGETS,
        payload: {
            data: budgets
        }
    });
}

export function remove(Id) {
    return function (dispatch) {
        fetch(`${REST_URL_BASE}/budget/delete/${Id}`, {
            method: 'GET'
        }).then((response) => {
            return response.json();
        }).then((json) => {
            if (json.status && json.status.toLowerCase() === 'ok') {
                dispatch(removeBudget(Id));
            } else {
                console.log(json);
            }
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function removeBudget(Id) {
    return ({
        type: REMOVE_BUDGET,
        payload: {
            data: Id
        }
    });
}

export function viewTransaction(budget) {
    return ({
        type: SET_BUDGET_FOR_TRANS_VIEW,
        payload: {
            data: budget
        }
    });
}