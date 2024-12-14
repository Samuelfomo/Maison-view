
class Shortlink {
    // token: string;
    // merchant: string;
    // decoder:number;
    // shortlink: string;
    // status: number;

    constructor(response) {
        if (response.status !== 1) {
            throw new Error('Invalid shortlink response status');
        }

        const data = response.response;
        this.token = data.token;
        this.merchant = data.merchant;
        this.decoder = data.decoder;
        this.shortlink = data.shorlink;
    }
}

module.exports = Shortlink;