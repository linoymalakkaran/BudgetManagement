const Promise = require("bluebird"),
    {
        executeQueryAsync,
        executeSelectQueryAsync
    } = require('./query-exec');

async function addTransaction(transaction) {
    /**
    * Type, Amount, Currency, PaidTo , Category , Notes 
    */
    let _sql = `INSERT INTO tbl_transactions 
        (Type, Amount, Currency, PaidTo, CategoryId, Notes, BudgetId,CreatedDate,UpdatedDate)
        VALUES("${transaction.Type}",
                ${transaction.Amount},
                "${transaction.Currency}",
                "${transaction.PaidTo}",
                ${transaction.CategoryId}, 
                "${transaction.Notes}", 
                ${transaction.BudgetId}, 
                "${new Date().toLocaleDateString()}",
                "${new Date().toLocaleDateString()}")`;
    return await executeQueryAsync(_sql);
}

async function updateTransaction(transaction) {
    let _sql = `UPDATE tbl_transactions 
        set Type="${transaction.Type}", 
            Amount = ${transaction.Amount},
            Currency = "${transaction.Currency}",
            PaidTo = "${transaction.PaidTo}", 
            CategoryId = ${transaction.CategoryId},
            BudgetId = ${transaction.BudgetId},
            Notes = "${transaction.Notes}",
            UpdatedDate = "${new Date().toLocaleDateString()}"
        where id="${transaction.Id}"`;
    return await executeQueryAsync(_sql);
}

async function deleteTransaction(Id) {
    let _sql = `DELETE FROM tbl_transactions where Id="${Id}"`;
    return await executeQueryAsync(_sql);
}

async function getAllTransactionAsync(query) {
    let _sql = `SELECT * FROM tbl_transactions`;
    return await executeSelectQueryAsync(_sql);
}

async function getAllTransactionByBudgetIdAsync(Id) {
    let _sql = `SELECT * FROM tbl_transactions where BudgetId=${Id}`;
    return await executeSelectQueryAsync(_sql);
}



module.exports = {
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getAllTransactionAsync,
    getAllTransactionByBudgetIdAsync
};