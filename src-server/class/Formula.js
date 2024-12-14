const Option = require('./Option');

class Formula {
    constructor(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Données invalides pour Formula');
        }
        this.guid = data.guid || null;
        this.code = data.code || null;
        this.name = data.name || null;
        this.amount = data.amount || 0;
        this.comment = data.comment || null;
        this.options = data.options ? data.options.map(opt => new Option(opt)) : [];
    }
}

module.exports = { Formula };
