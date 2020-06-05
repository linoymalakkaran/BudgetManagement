const Promise = require("bluebird"),
    express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    {
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getTransactions,
        getAllTransactionByBudgetIdAsync
    } = require('../utils/transactions')
    ;

let upload = multer();

router.post('/add', upload.array(), async (req, res) => {
    res.set('Content-Type', 'application/json');
    let transaction = JSON.parse(req.body.transaction);
    let result = await addTransaction(transaction);
    res.send({ status: "ok", data: result });
});

router.post('/update', upload.array(), async (req, res) => {
    res.set('Content-Type', 'application/json');
    let transaction = JSON.parse(req.body.transaction);
    let result = await updateTransaction(transaction);
    res.send({ status: "ok", data: result });
});

router.get('/delete/:Id', async (req, res) => {
    res.set('Content-Type', 'application/json');
    let result = await deleteTransaction(req.params.Id);
    res.send({ status: "ok", data: result });
});

router.get('/all', async (req, res) => {
    res.set('Content-Type', 'application/json');
    let result = await getAllTransactionAsync();
    res.send({ status: "ok", data: result });
});

router.get('/by_budget_id/:Id', async (req, res) => {
    res.set('Content-Type', 'application/json');
    let result = await getAllTransactionByBudgetIdAsync(req.params.Id);
    res.send({ status: "ok", data: result });
});


module.exports = router;