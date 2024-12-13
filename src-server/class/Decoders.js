const { DecoderError } = require('./DecoderErrors');
const { Subscriber } = require('./Subscribers');
const { Formula } = require('./Formulas');

class Decoder {

    constructor(response) {
        if (response.status !== 1) {
            throw new DecoderError('Invalid decoder response status');
        }

        const data = response.response;

        if (!data.existed || data.forbidden) {
            throw new DecoderError('Décodeur bloqué');
        }

        this.code = data.code;
        this.device = data.device;
        this.identifier = data.identifier;
        this.location = data.location;
        this.finished = data.finished;
        this.remaining = data.remaining;
        this.existed = data.existed;
        this.subscriber = new Subscriber(data.subscriber);
        this.formula = new Formula(data.formula);
    }
}

module.exports = { Decoder };