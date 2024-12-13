class DecoderErrors extends Error {
    constructor(message) {
        super(message);
        this.name = 'DecoderError';
    }
}

module.exports = { DecoderErrors };