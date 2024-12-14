import Formula from "./Formula";
import Subscriber from "./Subscriber";

class Decoder {
    public code?: number;
    public device?: number;
    public id?: number;
    public subscriber: Subscriber;
    public formula: Formula;
    public finished: Date;

    constructor(
        code: number,
        device: number,
        subscriber: Subscriber,
        formula: Formula,
        finished: Date,
        id?: number
    ) {
        this.code = code;
        this.device = device;
        this.id = id;
        this.subscriber = subscriber;
        this.formula = formula;
        this.finished = finished;
    }

    // public static fromJson(json: any): Decoder {
    //     return new Decoder(
    //         json.code,
    //         json.device,
    //         json.subscriber,
    //         json.formula,
    //         json.finished,
    //         json.identifier
    //     );
    // }

    public static fromJson(json: any): Decoder {
        return new Decoder(
            json.code,
            json.device,
            json.subscriber || new Subscriber(json.firstname, json.lastname, json.mobile, json.code),
            json.formula || new Formula(json.name, json.formula, json.options, json.amount),
            new Date(json.finished),
            json.identifier
        );
    }
}

export default Decoder;
