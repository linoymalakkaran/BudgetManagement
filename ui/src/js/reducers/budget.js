import {
    FETCH_BUDGET,
    UPDATE_BUDGET_ID,
    FETCH_BUDGETS,
    UPDATE_BUDGET,
    REMOVE_BUDGET,
    SET_BUDGET_FOR_TRANS_VIEW
} from '../actions/types.js';

let initialState = {
    budgets: [],
    selectedBudget: undefined
};

export default function budget(state = initialState, action) {
    switch (action.type) {
        case FETCH_BUDGET: {
            return state;
        }
        case FETCH_BUDGETS: {
            return Object.assign({}, state, { budgets: action.payload.data })
        }
        case UPDATE_BUDGET_ID: {
            return {
                ...state,
                ...{
                    budgets: [
                        ...state.budgets, action.payload.data
                    ]
                }
            };
        }
        case UPDATE_BUDGET: {
            const index = state.budgets.findIndex(budget =>
                budget.Id === action.payload.data.Id);
            return {
                ...state,
                ...{
                    budgets: [
                        ...state.budgets.slice(0, index),
                        {
                            ...state.budgets[index],
                            ...action.payload.data
                        },
                        ...state.budgets.slice(index + 1)
                    ]
                }
            };
        }
        case REMOVE_BUDGET: {
            const newBudgets = state.budgets.filter(obj => {
                return obj.Id != action.payload.data;
            });
            return {
                ...state,
                ...{
                    budgets: newBudgets
                }
            };
        }
        case SET_BUDGET_FOR_TRANS_VIEW: {
            return {
                ...state,
                ...{
                    selectedBudget: action.payload.data
                }
            }
        }
        default: {
            return state;
        }
    }
}