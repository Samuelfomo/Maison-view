class Formula {
    public name: string;
    public formula: string;
    public options: string | null;
    public amount: number;

    constructor(
        name: string,
        formula: string,
        amount: number,
        options: string | null = null
    ) {
        this.name = name;
        this.formula = formula;
        this.options = options;
        this.amount = amount;
    }
}

export default Formula;