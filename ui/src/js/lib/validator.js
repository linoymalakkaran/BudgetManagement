export const validateForm = (errors, formData) => {
    let valid = true;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );

    Object.values(formData).forEach(
        (val) => {
            val.length == 0 && (valid = false)
        }
    );
    return valid;
}


export const countErrors = (errors) => {
    let count = 0;
    Object.values(errors).forEach(
        (val) => val.length > 0 && (count = count + 1)
    );
    return count;
}

const decimalRegx = /^(\d*\.)?\d+$/;
export const CheckDecimal = (inputtxt) => {
    if (inputtxt.match(decimalRegx)) {
        return true;
    }
    else {
        return false;
    }
}


Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop]
    }
    return total
}