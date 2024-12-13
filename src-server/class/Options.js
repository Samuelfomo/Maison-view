class Option {
    constructor(data) {
        if (!data || typeof data !== 'object') {
            throw new Error('Données invalides pour Option');
        }
        this.code = data.code || null;
        this.name = data.name || null;
        this.amount = data.amount || 0;
        this.comment = data.comment || null;
    }
}

module.exports = Option;

