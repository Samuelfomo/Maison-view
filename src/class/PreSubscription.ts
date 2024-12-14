class PreSubscription {
    id: number | null;
    code: number;
    decoder: number | null;
    merchant: number | null;
    formula: string;
    options: string[] | [];
    duration: number;
    phoneNumber: number;
    total: number;
    // confirmed: boolean | null;

    constructor(
        id: number | null,
        code: number | null,
        decoder: number,
        merchant: number | null,
        formula: string,
        options: string[] | [],
        duration: number,
        phoneNumber: number,
        total: number,
        // confirmed: boolean | null,
        ) {
        this.id = id;
            this.code = code;
            this.decoder = decoder;
            this.merchant = merchant;
            this.formula = formula;
            this.options = options;
            this.duration = duration;
            this.phoneNumber = phoneNumber;
            this.total = total;
            // this.confirmed = confirmed;
    }

    public static fromJson(json: any): PreSubscription {
    return new PreSubscription (
    json.id,
    json.code,
    json.decoder,
    json.merchant,
    json.formula,
    json.options,
    json.duration,
    json.phoneNumber,
    json.total,
    // json.confirmed,
);
}

    // private PrepareData(){
    //     const data = {
    //         id: this.id || null,
    //         guid: this.guid || null,
    //         merchant: this.merchant || null,
    //         formula: this.formula,
    //         options: this.options || [],
    //         duration: this.duration,
    //         phoneNumber: this.phoneNumber,
    //         total: this.total,
    //     };
    //
    //     Object.keys(data).forEach(key => {
    //         if (data[key as keyof typeof data] === '' ||
    //             data[key as keyof typeof data] === null ||
    //             data[key as keyof typeof data] === undefined) {
    //             delete data[key as keyof typeof data];
    //         }
    //     });
    //     return data;
    // }
    //
    // async prepareConfirm(){
    //     try {
    //         const data= this.PrepareData ();
    //         console.log('Données envoyées au serveur:', data);
    //
    //         const response = await axios.post(
    //             `api/contact/add`,
    //             data,
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 }
    //             }
    //         );
    //
    //         // return data;
    //         return response.data;
    //
    //
    //     }catch (error: any) {
    //         if (axios.isAxiosError(error)) {
    //             console.error('Erreur détaillée:', error.response?.data);
    //             throw new Error(error.response?.data?.message || "Erreur lors du traitement de l'abonnement ");
    //         }
    //         throw error;
    //     }
    // }

}

export interface Alert {
    id: string | number;
    title: string;
    message: string;
    // type: 'success' | 'error';
    type: 'success' | 'warning' | 'error';
}

export default PreSubscription;