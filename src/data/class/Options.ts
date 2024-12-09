 class Options {
    public code: string ;
    public name: string | null = null;
    public amount: number | null = null;

    constructor(
        code: string,
        name: string | null = null,
        amount: number | null = null
    )
    {
        this.code = code;
        this.name = name;
        this.amount = amount;
    }

    public static fromJson(json: any): Options {
        return new Options(
            json.code,
            json.name,
            json.amount
        );
    }
}

export default Options;