import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../services/product/products.service';
import { FormBuilder, FormGroup, Validators, FormControl, NgForm } from '@angular/forms';
import * as Quill from 'quill';

@Component({
    selector: 'app-newproduct',
    templateUrl: './new.product.component.html',
    styleUrls: ['./new.product.component.css'],
    providers: [ProductsService] // define custom NgbDatepickerI18n provider
})
export class CreateProductComponent implements OnInit {
    quill;
    form: FormGroup;
    constructor(private _FormBuilder: FormBuilder, private _ProductsService: ProductsService) { }
    ngOnInit() {
        this.quill = new Quill('#editor-container', {
            modules: {
                toolbar: {
                    container: '#toolbar-toolbar'
                }
            },
            placeholder: 'Product description',
            theme: 'snow'
        });
    }

    onSubmit(f: NgForm) {
        var body = this.quill.root.innerHTML;
        this.create(f.value, body);
    }

    create = (data, body) => {
        this._ProductsService.createProduct(data, body).subscribe(
            result => {
                console.log(result.items);
            },
            error => {
                let mensajeerror = <any>error;
                console.log(mensajeerror);
            }
        );
    }



}