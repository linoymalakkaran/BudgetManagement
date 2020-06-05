const Promise = require("bluebird"),
    {
        executeQuery,
        executeSelectQuery,
        executeQueryAsync,
        executeSelectQueryAsync
    } = require('./query-exec');


async function addBudget(budget) {
    /**
     * Name, MaxAmount, Description
     */
    let _sql = `INSERT INTO tbl_budget 
        (Name, MaxAmount, Description,CreatedDate,UpdatedDate)
        VALUES("${budget.Name}", "${budget.MaxAmount}",
        "${budget.Description}", "${new Date().toLocaleDateString()}",
        "${new Date().toLocaleDateString()}")`;
    return await executeQueryAsync(_sql);
}

async function updateBudget(budget) {
    let _sql = `UPDATE tbl_budget 
    set Name="${budget.Name}", 
        MaxAmount = "${budget.MaxAmount}",
        Description = "${budget.Description}",
        UpdatedDate = "${new Date().toLocaleDateString()}"
    where Id="${budget.Id}"`;
    return await executeQueryAsync(_sql);
}

function deleteBudget(id) {
    let _sql = `DELETE FROM tbl_budget 
    where id="${id}"`;
    return executeQuery(_sql);
}

function getBudget(query) {
    let _sql = `SELECT * FROM tbl_budget order by id`;
    if (query) {
        _sql = `SELECT * FROM tbl_budget where ${query} order by id`;
    }
    return executeSelectQuery(_sql);
}

async function getBudgetRecordByIdAsync(Id) {
    let _sql = `SELECT * FROM tbl_budget where Id = ${Id}`;
    return await executeSelectQueryAsync(_sql);
}

async function getAllAsync(Id) {
    let _sql = `SELECT * FROM tbl_budget`;
    return await executeSelectQueryAsync(_sql);
}

module.exports = {
    addBudget,
    updateBudget,
    deleteBudget,
    getBudget,
    getBudgetRecordByIdAsync,
    getAllAsync
};