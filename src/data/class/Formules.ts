
class Formules {
    public name: string;
    public amount: number;

    constructor(
        name: string,
        amount: number
    ) {
        this.name = name;
        this.amount = amount
    }

    public static fromJson(json: any): Formules {
        return new Formules(
            json.name,
            json.amount
        )
}
}


export default Formules;