const Promise = require("bluebird"),
    db = require('../utils/sqlitedb')
    ;

function executeQuery(query) {
    console.log(query);
    return (
        new Promise((resolve, reject) => {
            db.serialize(function () {
                db.run(query, [], (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            });
        })
    );
}

async function executeQueryAsync(query) {
    console.log(query);
    return (
        new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run(query, [], function (err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this.lastID);
                    }
                });
            });
        })
    );
}

function executeSelectQuery(query) {
    console.log(query);
    return (
        new Promise((resolve, reject) => {
            db.serialize(function () {
                db.all(query, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });
        })
    );
}


async function executeSelectQueryAsync(query) {
    console.log(query);
    return (
        new Promise((resolve, reject) => {
            db.serialize(function () {
                db.all(query, (err, rows) => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log(rows);
                        resolve(rows);
                    }
                });
            });
        })
    );
}

module.exports = {
    executeQuery,
    executeSelectQuery,
    executeSelectQueryAsync,
    executeQueryAsync
};