import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/map';
import { Configuration } from './constants.service';


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



  allProductRpiparts = () => {
    let actionUrl = "https://www.kindlymedical.apolomultimedia-server1.info/public/index.php/product/list/0/0";
    let headers = this.setheader();
    return this._http.get("https://cors-anywhere.herokuapp.com/" + actionUrl, { headers: headers }).map(
      res => ({ items: res.json(), count: Number(res.headers.get('X-Total-Count')) }));
  }

  getProductRpiparts = (id) => {
    let actionUrl = "http://kindlymedical.apolomultimedia-server1.info/public/index.php/product/get/" + id;
    let headers = this.setheader();
    return this._http.get("https://cors-anywhere.herokuapp.com/" + actionUrl, { headers: headers }).map(
      res => ({ items: res.json(), count: Number(res.headers.get('X-Total-Count')) }));
  }

  //autenticacion Basic de shopify
  setheader = () => {
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.apikey + ":" + this.password));
    headers.append("Access-Control-Allow-Origin", "*");
    return headers;
  }

  countProducts = () => {
    let actionUrl = this.baseUrl + "/products/count.json";
    let headers = this.setheader();
    // https://cors-anywhere.herokuapp.com/     => Esta API permite realizar peticiones de origen cruzado en cualquier lugar.
    return this._http.get("https://cors-anywhere.herokuapp.com/" + actionUrl, { headers: headers }).map(
      /*Devuelve  la respuesta en json y la cantidad obtenida mediante la cabecera x-total-count*/
      res => ({ items: res.json(), count: Number(res.headers.get('X-Total-Count')) }));

  }

  allProducts = () => {
    let actionUrl = this.baseUrl + "/products.json";
    let headers = this.setheader();
    // https://cors-anywhere.herokuapp.com/     => Esta API permite realizar peticiones de origen cruzado en cualquier lugar.
    return this._http.get("https://cors-anywhere.herokuapp.com/" + actionUrl, { headers: headers }).map(
      /*Devuelve  la respuesta en json y la cantidad obtenida mediante la cabecera x-total-count*/
      res => ({ items: res.json(), count: Number(res.headers.get('X-Total-Count')) }));
  }

  getProduct = (id) => {
    let actionUrl = this.baseUrl + "/products/" + id + ".json";
    let headers = this.setheader();
    return this._http.get("https://cors-anywhere.herokuapp.com/" + actionUrl, { headers: headers }).map(
      res => ({ items: res.json(), count: Number(res.headers.get('X-Total-Count')) }));
  }

  createProduct = (data, description) => {
    let body: any =
      {
        "product": {
          "title": data.title,
          "body_html": "<strong> RPI Part <span class='description_rpi'>" + data.rpi + "</span><br>OEM Part <span class='description_oem'>" + data.oem + "</span><br></strong>" + description + "<br><strong>Part Description Updated: </strong><span class='description_updated'>" + data.descriptionupdated + "</span>",
          "vendor": data.vendor,
          "product_type": data.type,
          "tags": data.tags,
          "variants": [
            {
              "option1": "Default Title",
              "price": data.price,
              "sku": ""
            }
          ]
        }
      };
    let actionUrl = this.baseUrl + "/products.json";
    let headers = this.setheader();
    return this._http.post("https://cors-anywhere.herokuapp.com/" + actionUrl, body, { headers: headers }).map(
      res => ({ items: res.json(), count: Number(res.headers.get('X-Total-Count')) }));
  }

  deleteProduct = (id) => {
    let actionUrl = this.baseUrl + "/products/" + id + ".json";
    let headers = this.setheader();
    return this._http.delete("https://cors-anywhere.herokuapp.com/" + actionUrl, { headers: headers }).map(
      res => ({ items: res.json(), count: Number(res.headers.get('X-Total-Count')) }));
  }
  updateProduct = (id, data, description) => {
    let body: any =
      {
        "product": {
          "id": id,
          "title": data.title,
          "body_html": "<strong>RPI Part <span class='description_rpi'>" + data.rpi + "</span><br>OEM Part <span class='description_oem'>" + data.oem + "</span><br></strong>" + description + "<br><strong>Part Description Updated: </strong><span class='description_updated'>" + data.descriptionupdated + "</span>",
          "vendor": data.vendor,
          "product_type": data.type,
          "tags": data.tags,
          "variants": [
            {
              "option1": "Default Title",
              "sku": ""
            }
          ]
        }
      };
    let actionUrl = this.baseUrl + "/products/" + id + ".json";
    let headers = this.setheader();
    return this._http.put("https://cors-anywhere.herokuapp.com/" + actionUrl, body, { headers: headers }).map(
      res => ({ items: res.json(), count: Number(res.headers.get('X-Total-Count')) }));
  }



















  //*********************************XMLHttpRequest************************************ */  
  getProducts = (cb) => {
    let actionUrl = this.baseUrl + "/products.json";
    const req = new XMLHttpRequest();
    let comodin = 'https://cors-anywhere.herokuapp.com/';
    req.open('GET', comodin + actionUrl, true);
    req.responseType = 'text';
    req.setRequestHeader('Content-Type', 'application/json');
    req.setRequestHeader('Authorization', 'Basic ' + btoa('96cbaf7f064b45a3ab2493a845875c22' + ':' + '20b998cb77a2b9965c29666c4324413e'));
    req.onload = () => {
      if (req.readyState === req.DONE) {
        if (req.status === 200) {
          cb(JSON.parse(req.response));
          console.log(req.responseText);
        }
      }
    };
    req.send(null);
  }





}
