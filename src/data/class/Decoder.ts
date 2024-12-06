import Formula from "./Formula";
import Subscriber from "./Subscriber";

class Decoder {
    public merchant?: number;
    public device?: number;
    public id?: number;
    public subscriber: Subscriber;
    public formula: Formula;
    public finished: Date;

    constructor(
        merchant: number,
        device: number,
        subscriber: Subscriber,
        formula: Formula,
        finished: Date,
        id?: number
    ) {
        this.merchant = merchant;
        this.device = device;
        this.id = id;
        this.subscriber = subscriber;
        this.formula = formula;
        this.finished = finished;
    }

    public static fromJson(json: any): Decoder {
        return new Decoder(
            json.code,
            json.device,
            json.subscriber,
            json.formula,
            json.finished,
            json.identifier
        );
    }
}

export default Decoder;
