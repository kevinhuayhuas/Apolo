import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public shop = 'kindlymedical';
    public apikey = '96cbaf7f064b45a3ab2493a845875c22';//'b7c2418a976a6483014431589fb96ab7';
    public password = '20b998cb77a2b9965c29666c4324413e';//'1082c818f93980f8f85a251cef983752';
    public Server: string = 'https://' + this.shop + '.myshopify.com';
    public ApiUrl: string = '/admin';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}