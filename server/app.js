/**
 * Application interface
 * 1. Save (App/transaction profile) (C)
 * 2. Search and View Profile (R)
 * 3. Edit Profile (U)
 * 4. Delete Profile (D)
 */

const path = require('path')
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });
const express = require('express'),
    app = express(),
    Promise = require("bluebird"),
    bodyParser = require('body-parser'),
    transaction_router = require('./routes/transactions-router'),
    budget_router = require('./routes/budget-router'),
    looksups_router = require('./routes/looksups-router');


//dotenv.load({ path: '.env' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(process.env.context, express.static('public'));
app.use(`${process.env.context}/api/transaction`, transaction_router);
app.use(`${process.env.context}/api/budget`, budget_router);
app.use(`${process.env.context}/api/looksups`, looksups_router);

app.listen(process.env.PORT, () => {
    console.log(`App running => http://localhost:${process.env.PORT}${process.env.context}`);
});

