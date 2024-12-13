export interface DecoderResponse {
    status: number;
    type: string;
    response: {
        code: number;
        device: number;
        identifier: number;
        location: string;
        subscriber: SubscriberData;
        started: string;
        finished: string;
        remaining: number;
        formula: FormulaData;
        updated: string;
        existed: boolean;
        verified: boolean;
        forbidden: boolean;
        comment: string | null;
    };
}

export interface SubscriberData {
    code: number;
    firstname: string;
    lastname: string;
    city: {
        code: string;
        name: string;
        country: {
            code: number;
            alpha2: string;
            alpha3: string;
            dialcode: number;
            fr: string;
            en: string;
        };
    };
    location: string;
    language: string;
    gender: string;
    mobile: number;
    email: string | null;
    qualified: boolean;
}

export interface FormulaData {
    code: string;
    name: string;
    amount: number;
    comment: string | null;
    options: any | null;
}

export interface ShortlinkResponse {
    status: number;
    type: string;
    response: {
        token: string;
        merchant: number;
        decoder: number;
        shorlink: string;
    },
}

export interface RequiementResponse {
    status: number;
    type: string;
    response: {
        formulas: FormulaData;
        options: OptionData
    },
}

export interface OptionData {
    code: string;
    name: string;
    amount: number;
    comment: string | null;
    options: string | null;
}

export interface SubscriptionResponse {
    status: number;
    type: string;
    response: {
        code: number;
        date: string;
        time: string;
        reference: string;
        self_service: boolean;
        duration: number;
        amount: number;
        formula_cost: number;
        options_cost: number;
        status: SubscriptionStatus;
        operation: SubscriptionOperation;
        decoder: DecoderData;
        earned: number;
        subscriber: SubscriberData;
        merchant: MerchantData;
        formula: FormulaData;
        old_formula: FormulaData;
        options: OptionData | null;
        comment: string | null;
    };
}

export interface SubscriptionStatus {
    token: string;
    charcode: string;
    name: string;
    color: string;
}

export interface SubscriptionOperation {
    token: string;
    reference: string;
    name: string;
    viewing: string;
    color: string;
}

export interface DecoderData {
    code: number;
    device: number;
    identifier: number;
    location: string;
    subscriber: SubscriberData;
    started: string;
    finished: string;
    remaining: number;
    formula: FormulaData;
    updated: string;
    existed: boolean;
    verified: boolean;
    forbidden: boolean;
    comment: string | null;
}

export interface MerchantData {
    code: number;
    name: string;
    city: CityData;
    location: string;
    cga: number;
    secured: boolean;
    certified: boolean;
    manager: ManagerData;
    mobile: number;
    email: string | null;
    rates: number;
    range: number[];
}

export interface ManagerData {
    code: number;
    firstname: string;
    lastname: string;
    city: CityData;
    location: string;
}

export interface CityData {
    code: string;
    name: string;
    country: CountryData;
}

export interface CountryData {
    code: number;
    alpha2: string;
    alpha3: string;
    dialcode: number;
    fr: string;
    en: string;
}

export interface SubscriberData {
    code: number;
    firstname: string;
    lastname: string;
    city: CityData;
    location: string;
    language: string;
    gender: string;
    mobile: number;
    email: string | null;
    qualified: boolean;
}
