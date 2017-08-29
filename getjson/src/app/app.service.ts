import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from './app.config';

@Injectable()
export class ProductsService {

    private baseUrl: string;
    private apikey;
    private password;


    constructor(private _http: Http, private _configuration: Configuration) {
        this.baseUrl = _configuration.ServerWithApiUrl;
        this.apikey = _configuration.apikey;
        this.password = _configuration.password;
    }
    //autenticacion Basic de shopify
    setheader = () => {
        let headers = new Headers();
        headers.append("Authorization", "Basic " + btoa(this.apikey + ":" + this.password));
        headers.append("Access-Control-Allow-Origin", "*");
        return headers;
    }

    allProducts = () => {
        let actionUrl = "https://www.kindlymedical.apolomultimedia-server1.info/public/index.php/product/list/0/0";
        let headers = this.setheader();
        // https://cors-anywhere.herokuapp.com/     => Esta API permite realizar peticiones de origen cruzado en cualquier lugar.
        return this._http.get("https://cors-anywhere.herokuapp.com/" + actionUrl, { headers: headers }).map(
            /*Devuelve  la respuesta en json y la cantidad obtenida mediante la cabecera x-total-count*/
            res => ({ items: res.json(), count: Number(res.headers.get('X-Total-Count')) }));
    }

    createProduct = (data) => {
        let bod: any =
            {
                data: [{
                    "title": data.title,
                    "rpi": data.rpi,
                    "oem": data.oem,
                    "ul": data.ul,
                    "fits": data.fits,
                    "model": data.model,
                    "catalog": data.catalog,
                    "f_update": data.update,
                    "note": data.notes,
                    "img": data.image,
                    "header": data.header,
                    "price": data.price,
                    "tags": data.tags,
                    "fmcudata": data.fmcudata,
                    "allinfo": data.allinfo,
                    "html": data.html,
                }
                ]
            };
        let body: any =
            {
                "title": data.title
            };

        let actionUrl = this.baseUrl + "/products.json";
        let headers = this.setheader();
        return this._http.post("https://cors-anywhere.herokuapp.com/" + actionUrl, body, { headers: headers }).map(
            res => ({ items: res.json(), count: Number(res.headers.get('X-Total-Count')) }));
    }





    callOtherDomain() {
        var invocation = new XMLHttpRequest();
        invocation.open('GET', "https://cors-anywhere.herokuapp.com/" + "https://www.kindlymedical.apolomultimedia-server1.info/public/index.php/product/list/1/1", true);
        invocation.setRequestHeader(
            'X-Custom-Header', 'value');
        invocation.onreadystatechange = function () { console.log("process " + invocation.responseText) }
        invocation.send();
    }

}
