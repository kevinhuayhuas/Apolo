import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import * as Quill from 'quill';
import 'rxjs/add/operator/map';
declare var jQuery: any;
declare var $: any;
import { ProductsService } from './app.service';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductsService] //importanto mi servicio
})
export class AppComponent implements OnInit {
  //variables 
  collection = null;
  subcollection = [];
  subcollectionNivel1 = [];
  //link Subcategopria
  linkSubCollection = [];
  linkSubCollectionNivel1 = [];
  //https://www.rpiparts.com/partsfit.asp
  url;
  quill;
  array = [];
  data_ex;
  testRequestId = '';
  constructor(private _ProductsService: ProductsService, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    /* 
    this.quill = new Quill('#editor', {
      debug: 'info',
      modules: {
        toolbar: '#toolbar'
      },
      placeholder: "<!DOCTYPE html><html><head><title></title></head><body></body></html>",
      theme: 'snow'
    });
    */
    this.list();
  }

  list = () => {
    //this._ProductsService.callOtherDomain();
    this._ProductsService.allProducts().subscribe(
      result => {
        this.data_ex = result.items.data;
        console.log(result.items.length);
        /*  console.log(this.data_ex);
          console.log(atob(result.items.data[0].ul).split(","));
          console.log(atob(result.items.data[0].price).split(","));
          console.log(atob(result.items.data[0].header).split(","));
          console.log((result.items.data[0].allinfo).split(","));
          console.log(result.items.data[0].html);*/
      },
      error => {
        let mensajeerror = <any>error;
        console.log(mensajeerror);
      }
    );
  }

  closeAlert = () => {
    $(".meesage_close").hide();
  }

  create = (data) => {
    this._ProductsService.createProduct(data).subscribe(
      result => {
        console.log(result.items);
        $(".meesage_close").fadeIn("slow");
        $(".insert_html").val("");
      },
      error => {
        let mensajeerror = <any>error;
        console.log(mensajeerror);
      }
    );
  }

  getUrl = () => {
    this.url = $("#uri").val();
    try {
      $("#content_html").load("https://cors-anywhere.herokuapp.com/" + this.url);
    } catch (error) {
    }

    const interval = window.setInterval(() => {
      //variables
      let collectionArray = [];
      let subCollectionArray = [];
      let linkSubCollectionArray = [];
      //collecciones
      $(".p7AP3trig").each(function () {
        let collect = $(this).find('img').attr("alt");
        //obteniendo las colecciones
        collectionArray.push(collect);
      });
      //capturando las colecciones
      this.collection = collectionArray;
      //subcolecciones
      $("ul li").each(function () {
        let subCollect = $(this).text();
        let linkSubCollect = $(this).find("a").attr("href");
        subCollectionArray.push(subCollect);
        linkSubCollectionArray.push("https://www.rpiparts.com/" + linkSubCollect);
      });
      //capturando las colecciones
      this.subcollection = subCollectionArray;
      //capturando link de subcollecciones}
      this.linkSubCollection = linkSubCollectionArray;
      //imprimiendo
      console.log(this.collection);
      console.log(this.subcollection);
      console.log(this.linkSubCollection);
      //salir
      //cerramos intervalo de tiempo
      clearInterval(interval);
      //cargando un nuevo DOM

      for (var index = 0; index < this.linkSubCollection.length; index++) {
        $("#content_html").load("https://cors-anywhere.herokuapp.com/" + this.linkSubCollection[index]);

        //Nuevo intervalo de tiempo
        const interval2 = window.setInterval(() => {
          let subCollectionArrayNivel2 = [];
          let linkSubCollectionArrayNivel2 = [];

          $("ul li").each(function () {
            let subCollectNivel2 = $(this).text();
            let linkSubCollectNivel2 = $(this).find("a").attr("href");
            subCollectionArrayNivel2.push(subCollectNivel2);
            linkSubCollectionArrayNivel2.push("https://www.rpiparts.com/" + linkSubCollectNivel2);
          });

            //capturando las colecciones
            this.subcollectionNivel1.push(subCollectionArrayNivel2);
            //capturando link de subcollecciones}
            this.linkSubCollectionNivel1.push(linkSubCollectionArrayNivel2);



          console.log(this.subcollectionNivel1);
          console.log(this.linkSubCollectionNivel1);
          //cerramos intervalo de tiempo
          clearInterval(interval2);
        }, 5000);

        if (index >= 1) {
          break;
        }

      }//fin for
    }, 5000);

  }

  onSubmit(f: NgForm) {
    this.array = f.value.description;
    const interval = window.setInterval(() => {
      this.create(this.load());
      clearInterval(interval);//salir
    }, 3000);
  }

  load = (): Observable<any> => {
    let parse = null;
    let total;
    let html;
    let count = 1;
    let first = [];
    let b = [];
    let li = [];
    let tdp = [];
    let tdh = [];
    let p = [];
    let img = [];
    let allinfo = [];
    let rpi, oem, title, ul, fits, model, catalog, update, notes, header = [], price = [], tags, image;
    let fmcudata;
    html = $(".content").html();
    $(".content").each(function () {
      $("table").each(function () {
        if (count == 1) {
          first.push($(this).find("h2").text());
          $("b").each(function () {
            b.push($(this).text());
          });
          $("ul li").each(function () {
            li.push($(this).text());
          });

          $("td").each(function () {
            if ($(this).attr("align")) {
              var d = $(this).find("b").text();
              tdh.push(d);
            }
            if ($(this).attr("valign")) {
              tdp.push($(this).text());
            }
          });
          $("p").each(function () {
            p.push($(this).text());
          });

          $("img").each(function () {
            var url = "https://www.rpiparts.com/" + $(this).attr("src");
            if ($(this).parent().attr("align")) {
              img.push(url);
            }
            $(this).attr("src", url);
          });

          allinfo.push(li, p, b, tdp, tdh, img);

          rpi = b[0];
          oem = b[1];
          title = b[2];
          ul = li;
          fits = b[3];
          model = b[4];
          catalog = b[5];
          update = b[6];
          notes = b[7];
          fmcudata = (p[2] + " " + p[3]).trim();
          header.push(tdh[2], tdh[3], tdh[4], tdh[5]);
          price.push(tdp[0], tdp[1], tdp[2], tdp[3]);
          tags = p[0];
          image = img[0];
          let all;
          try { all = allinfo.toString(); } catch (exception) { }
          if (title == "undefined") {
            title = "und";
          }
          total = {
            "title": title,
            "rpi": rpi,
            "oem": oem,
            "ul": (ul.toString()),
            "fits": fits,
            "model": model,
            "catalog": catalog,
            "update": update,
            "note": notes,
            "image": image,
            "header": btoa(header.toString()),
            "price": btoa(price.toString()),
            "tags": tags,
            "fmcudata": fmcudata,
            "allinfo": all,
            "html": html
          }
          count++;
        } else {
          console.log(count);
          count++;
        }
      });
    });
    return total;
  }


  /*
    process = () => {
      var body = this.quill.root.innerHTML;
      this.array=body;
    }
  */


}
