import { Component } from '@angular/core';
import { ProductsService } from '../../services/product/products.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductsService] //importanto mi servicio
})
export class ProductComponent {
  arrayTemp1: any[] = [];
  arrayTemp2: any[] = [];
  rowsRpiparts = [];
  tempRpiparts = [];
  columnsRpiparts = [
    { prop: 'title', name: "Title" },
    { prop: 'rpi', name: 'RPI' },
    { prop: 'oem', name: 'OEM' },
    { prop: 'tags', name: 'TAG' }
  ];
  selected: any[] = [];
  /* rows = [];
   temp = [];
  columns = [
     { prop: 'title', name: "Title" },
     { prop: 'vendor', name: 'Vendor' },
     { prop: 'product_type', name: 'Product type' },
   ];
 */
  constructor(private _ProductsService: ProductsService, private router: Router) {
    // this.list();
    this.listRpiparts();

  }

  listRpiparts = () => {
    this._ProductsService.allProductRpiparts().subscribe(
      result => {

        this.tempRpiparts = result.items['data'];
        this.rowsRpiparts = result.items['data'];
        this.test();
        //console.log(result.items['data']);
      },
      error => {
        let mensajeerror = <any>error;
        console.log(mensajeerror);
      }
    );
  }

  test() {
    for (var index = 1; index <= 1550; index++) {
      this.arrayTemp1.push(this.tempRpiparts[index]);
      console.log(index);
    }
    console.log(this.arrayTemp1);
  }

  /*
      list = () => {
        this._ProductsService.allProducts().subscribe(
          result => {
            //console.log(result.items['products']);
            this.temp = [result.items['products']];
            this.rows = result.items['products'];
          },
          error => {
            let mensajeerror = <any>error;
            console.log(mensajeerror);
          }
        );
      }
  */

  updateFilter(event) {
    try {
      let val = event.target.value;
      // filter our data
      let temp = this.arrayTemp1.filter( (d) => {

        console.log(d.rpi.indexOf(val));
        return d.rpi.indexOf(val) !== -1 || !val;
      });
      this.rowsRpiparts = temp;

    } catch (error) {
      console.log(error);
    }
  }


  onSelectRpiparts(event) {
    this.router.navigate(['/products/details', event.selected[0].id]);//redireccionamos al detalle del producto
  }

  onSelect(event) {
    this.router.navigate(['/products/details', event.selected[0].id]);//redireccionamos al detalle del producto
  }

  onActivate(event) {
    console.log('Event: activate', event);
  }

}
