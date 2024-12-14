class Subscriber {
    // code: number;
    // firstname: string;
    // lastname: string;
    // city: string;
    // location: string;
    // language: string;
    // gender: string;
    // mobile: number;
    // email: string;
    // qualified: boolean;
    constructor(data) {
        this.code = data.code;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.city = data.city.name;
        this.location = data.location;
        this.language = data.language;
        this.gender = data.gender;
        this.mobile = data.mobile;
        this.email = data.email;
        this.qualified = data.qualified;
    }
}

module.exports = { Subscriber };