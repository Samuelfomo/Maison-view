class Subscriber {
    public code?: number;
    public firstname: string;
    public lastname: string;
    public mobile: number;

    constructor(
        firstname: string,
        lastname: string,
        mobile: number,
        code?: number
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.mobile = mobile;
        this.code = code;
    }
}
export default Subscriber;