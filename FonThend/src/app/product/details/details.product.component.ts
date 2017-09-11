import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product/products.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, ParamMap } from '@angular/router';
import * as Quill from 'quill';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './details.product.component.html',
  styleUrls: ['./details.product.component.css'],
  providers: [ProductsService] //importanto mi servicio
})
export class DetailProductComponent implements OnInit {
  quill2;
  quill3;
  p = null;
  pr = null;
  form: FormGroup;

  headerPriceRpiparts = [];
  pricesRpiparts = [];
  constructor(private _ProductsService: ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getRpiparts(); // get product Rpiparts
    this.quill2 = new Quill('#editor', {
      modules: {
        toolbar: '#toolbar'
      },
      placeholder: 'Product description',
      theme: 'snow'
    });
    this.quill3 = new Quill('#editorRpiparts', {
      modules: {
        toolbar: '#toolbarRpiparts'
      },
      placeholder: 'Product description',
      theme: 'snow'
    });
  }
  onSubmit(f: NgForm) {
    var body = this.quill2.root.innerHTML;
    this.update(this.p.id, f.value, body);
  }
  onSubmitrpiparts(frpiparts: NgForm) {
    var body = this.quill3.root.innerHTML;
    this.update(this.p.id, frpiparts.value, body);
  }

  get = () => {
    this.route.paramMap.switchMap((params: ParamMap) =>
      this._ProductsService.getProduct(params.get('id'))
    ).subscribe(
      result => {
        //console.log(result.items['product']);
        this.p = result.items['product'];
        //add body_html
        this.quill2.clipboard.dangerouslyPasteHTML(this.p.body_html);
      },
      error => {
        let mensajeerror = <any>error;
        console.log(mensajeerror);
      }
      );
  }

  getRpiparts = () => {
    this.route.paramMap.switchMap((params: ParamMap) =>
      this._ProductsService.getProductRpiparts(params.get('id'))
    ).subscribe(
      result => {
        //console.log(result.items);
        this.pr = result.items;
        let arrayheaderPrice = atob(result.items.header).split(",");
        let ul;
        try {
          ul = atob(this.pr.ul);
        } catch (error) {
          ul = this.pr.ul;
        }
        console.log(ul);
        for (let i = 0; i < arrayheaderPrice.length; i++) {
          this.headerPriceRpiparts.push(arrayheaderPrice[i]);
        }
        let arrayprice = atob(result.items.price).split(",");
        for (let i = 0; i < arrayprice.length; i++) {
          this.pricesRpiparts.push(arrayprice[i]);
        }
        this.quill3.clipboard.dangerouslyPasteHTML(ul+ "<br>" + this.pr.fmcudata);
      },
      error => {
        let mensajeerror = <any>error;
        console.log(mensajeerror);
      }
      );
  }

  update = (id, data, body) => {
    this._ProductsService.updateProduct(id, data, body).subscribe(
      result => {
        console.log(result.items);
      },
      error => {
        let mensajeerror = <any>error;
        console.log(mensajeerror);
      }
    );
  }

  delete = () => {
    this._ProductsService.deleteProduct(this.p.id).subscribe(
      result => {
        console.log("ok");
        this.router.navigate(['/products/all']);//redireccionamos al detalle del producto
      },
      error => {
        let mensajeerror = <any>error;
        console.log("here :" + mensajeerror);
      }
    );
  }



}