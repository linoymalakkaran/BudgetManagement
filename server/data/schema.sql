CREATE TABLE tbl_budget (
    Id          INTEGER  PRIMARY KEY AUTOINCREMENT
                         UNIQUE
                         NOT NULL,
    Name        STRING   NOT NULL,
    MaxAmount   DECIMAL  NOT NULL,
    Description STRING,
    CreatedDate DATETIME DEFAULT (CURRENT_TIMESTAMP),
    UpdatedDate DATETIME DEFAULT (CURRENT_TIMESTAMP) 
);


CREATE TABLE tbl_transactions (
    Id          INTEGER  PRIMARY KEY AUTOINCREMENT
                         UNIQUE
                         NOT NULL,
    Type        STRING   NOT NULL,
    Amount      DECIMAL  NOT NULL,
    Currency    STRING   NOT NULL,
    PaidTo      STRING,
    CategoryId  INTEGER  NOT NULL
                         REFERENCES tbl_category (Id) ON DELETE CASCADE,
    Notes       STRING,
    BudgetId    INTEGER  REFERENCES tbl_budget (Id) ON DELETE CASCADE
                         NOT NULL,
    CreatedDate DATETIME DEFAULT (CURRENT_TIMESTAMP),
    UpdatedDate          DEFAULT (CURRENT_TIMESTAMP) 
);


CREATE TABLE tbl_category (
    Id          INTEGER PRIMARY KEY AUTOINCREMENT
                        UNIQUE
                        NOT NULL,
    Name        STRING  NOT NULL,
    Description STRING
);

