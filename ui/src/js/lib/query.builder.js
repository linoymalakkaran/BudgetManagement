function getSeperator(txt) {
    let seperator = '=';
    if (txt.indexOf('%') !== -1) {
        seperator = 'like';
    }
    return seperator;
}

export function buildBudgetQuery(budget) {
    let _query = '';
    if (budget) {
        if (budget.Id) {
            _query = ` Id ${getSeperator(budget.Id)} "${budget.Id}" `;
        }
        if (budget.Name) {
            if (_query) _query += ' and ';
            _query += ` Name ${getSeperator(budget.Name)} "${budget.Name}" `;
        }
    }
    return _query;
}