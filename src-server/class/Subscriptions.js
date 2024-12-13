class Subscription {
    // code: string;
    // merchant: string;
    // devise: string;
    // duration: number;
    // formula: string;
    // option: string | null;

    constructor(response) {
        if (response.status !== 1) {
            throw new Error('Invalid Subscription response status');
        }
        const data = response.response;

        this.code = data.code;
        this.merchant = data.merchant.code;
        this.devise = data.decoder.device
        this.duration = data.duration;
        this.formula = data.formula.code;
        this.option = data.options?.code || null
    }
}
module.exports = Subscription;