const Promise = require("bluebird"),
    express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    {
        executeSelectQuery,
        executeQuery
    } = require('../utils/query-exec');

let upload = multer();


router.get('/get_categories', (req, res) => {
    res.set('Content-Type', 'application/json');

    let _sql = `SELECT * from tbl_category`;
    executeSelectQuery(_sql).then((data) => {
        res.send({
            data,
            status: "ok"
        });
    }).catch((err) => {
        res.send({
            status: 'error',
            err
        });
    });
});



module.exports = router;