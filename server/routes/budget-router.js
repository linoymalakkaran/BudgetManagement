const Promise = require("bluebird"),
    express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    {
        addBudget,
        updateBudget,
        deleteBudget,
        getBudget,
        getBudgetRecordByIdAsync,
        getAllAsync
    } = require('../utils/Budget');

let upload = multer();

router.post('/add', upload.array(), async (req, res) => {
    res.set('Content-Type', 'application/json');
    let budget = JSON.parse(req.body.budget);
    let result = await addBudget(budget);
    res.send({ status: "ok", data: result });
});

router.post('/update', upload.array(), async (req, res) => {
    res.set('Content-Type', 'application/json');
    let budget = JSON.parse(req.body.budget);
    let result = await updateBudget(budget);
    res.send({ status: "ok", data: result });
});

router.get('/delete/:Id', async (req, res) => {
    res.set('Content-Type', 'application/json');
    let result = await deleteBudget(req.params.Id);
    res.send({ status: "ok", data: result });
});


router.get('/get_budget_by_id/:Id', async (req, res) => {
    res.set('Content-Type', 'application/json');
    let Id = req.params.Id;
    let result = await getBudgetRecordByIdAsync(Id);
    result = result && result.length > 0 ? result : [];
    res.send({ status: "ok", data: result });
});

router.get('/all', async (req, res) => {
    res.set('Content-Type', 'application/json');
    let result = await getAllAsync();
    res.send({ status: "ok", data: result });
});



module.exports = router;