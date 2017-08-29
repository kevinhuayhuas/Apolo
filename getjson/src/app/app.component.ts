import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import * as Quill from 'quill';
import 'rxjs/add/operator/map';
declare var jQuery: any;
declare var $: any;
import { ProductsService } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductsService] //importanto mi servicio
})
export class AppComponent implements OnInit {
  quill;
  array = [];
  data;
  constructor(private _ProductsService: ProductsService) { }

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
        console.log(result.items);
      },
      error => {
        let mensajeerror = <any>error;
        console.log(mensajeerror);
      }
    );
  }

  create = (data) => {
    //this._ProductsService.callOtherDomain();
    this._ProductsService.createProduct(data).subscribe(
      result => {
        console.log(result.items);
      },
      error => {
        let mensajeerror = <any>error;
        console.log(mensajeerror);
      }
    );
  }

  getUrl = () => {
    var url = $("#uri").val();
    $("#content_html").load("https://cors-anywhere.herokuapp.com/" + url);
    const interval = window.setInterval(() => {
      this.load();
      clearInterval(interval);//salir
    }, 3000);
  }

  onSubmit(f: NgForm) {
    this.array = f.value.description;
    const interval = window.setInterval(() => {
      console.log(this.load());
      clearInterval(interval);//salir
    }, 3000);
  }

  load = ():Observable<any> => {
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

          allinfo.push(first, b, li, tdh, tdp, p, img);
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
          let total = {
            "title": title,
            "rpi": rpi,
            "oem": oem,
            "ul": ul,
            "fits": fits,
            "model": model,
            "catalog": catalog,
            "update": update,
            "note": notes,
            "image": image,
            "header": header,
            "price": price,
            "tags": tags,
            "fmcudata": fmcudata,
            "allinfo": allinfo,
            "html": html,
          }
          let json = JSON.stringify(total);
          parse = JSON.parse(json);
          count++;
        } else {
          console.log(count);
          count++;
        }
      });
    });
    return parse;
  }





  /*
    process = () => {
      var body = this.quill.root.innerHTML;
      this.array=body;
    }
  */


}
