
class Formules {
    public code: string;
    public name: string;
    public amount: number;

    constructor(
        code: string,
        name: string,
        amount: number
    ) {
        this.code = code;
        this.name = name;
        this.amount = amount
    }

    public static fromJson(json: any): Formules {
        return new Formules(
            json.code,
            json.name,
            json.amount
        )
}
}


export default Formules;