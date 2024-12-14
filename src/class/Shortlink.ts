class Shortlink {

    public token: string | undefined;
    public merchant: number | undefined;
    public decoder: number | undefined;
    public shorlink: string | undefined;

  constructor(
      token: string,
      merchant: number,
      decoder: number,
      shortlink: string,
  )
  {
      this.token = token;
      this.merchant = merchant;
      this.decoder = decoder;
      this.shorlink = shortlink;
  }

public static fromJson(json: any): Shortlink{
      return new Shortlink(
          json.token,
          json.merchant,
          json.decoder,
          json.shortlink
      );
}
    // async getshortlink()  {
    //     if (!this.token) throw new Error('No token provided');
    //     const username = 'cee47ec8-4ae7-46dc-b131-dc00eb43d02e';
    //     const password = 'eG2ZA4Jr#c}y(FED{N8_fS';
    //     const credentials = btoa(username + ':' + password);
    //     const basicAuth = 'Basic ' + credentials;
    //     try {
    //         console.log('Fetching device details...', this.token);
    //         const responcse = await axios.put(`${Constant.APIENDPOINT}/shortlink/`, {
    //             shortlink: this.token,
    //         },{headers: {
    //                 'Authorization': `${basicAuth}`,
    //             },});
    //
    //         console.log("voici ca");
    //         console.log(responcse);
    //
    //
    //     } catch (error) {
    //         console.error('Error fetching device details:', error)
    //     }
    //     return true;
    // }
}

export default Shortlink;