import {
    UPDATE_TRANSACTION_ID,
    UPDATE_TRANSACTION,
    REMOVE_TRANSACTION,
    RECEIVE_TRANSACTIONS
} from '../actions/types.js';

let initialStateForTransactions = {
    transactions: []
};

export default function transactions(state = initialStateForTransactions, action) {
    switch (action.type) {
        case UPDATE_TRANSACTION_ID: {
            return {
                ...state,
                ...{
                    transactions: [
                        ...state.transactions, action.payload.data
                    ]
                }
            };
        }
        case UPDATE_TRANSACTION: {
            const index = state.transactions.findIndex(transaction =>
                transaction.Id === action.payload.data.Id);
            return {
                ...state,
                ...{
                    transactions: [
                        ...state.transactions.slice(0, index),
                        {
                            ...state.transactions[index],
                            ...action.payload.data
                        },
                        ...state.transactions.slice(index + 1)
                    ]
                }
            };
        }
        case REMOVE_TRANSACTION: {
            const newTransactions = state.transactions.filter(obj => {
                return obj.Id != action.payload.data;
            });
            return {
                ...state,
                ...{
                    transactions: newTransactions
                }
            };
        }
        case RECEIVE_TRANSACTIONS: {
            return {
                ...state,
                ...{
                    transactions: action.payload.data
                }
            };
        }
        default:
            return state;
    }
}