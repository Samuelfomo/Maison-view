const Option = require('./Options');
const { Formula } = require('./Formulas');

class Requirement {
    constructor(data) {
        if (data.status !== 1 || data.type !== 'dataset') {
            throw new Error('Invalid requirement response status or type');
        }

        const responseData = data.response;

        this.formulas = (responseData.formulas || []).map(formula => {
            return new Formula({
                ...formula,
                options: formula.options || null
            });
        });

        this.options = (responseData.options || []).map(option =>
            new Option({
                ...option,
                options: option.options || null
            })
        );
    }
}

module.exports = Requirement;