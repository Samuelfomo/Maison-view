 class Options {
    public name: string | null = null;
    public amount: number | null = null;

    constructor(
        name: string | null = null,
        amount: number | null = null
    )
    {
        this.name = name;
        this.amount = amount;
    }

    public static fromJson(json: any): Options {
        return new Options(
            json.name,
            json.amount
        );
    }
}

export default Options;