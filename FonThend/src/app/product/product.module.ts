import { NgModule } from '@angular/core';
import { JsonpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ProductRoutes } from './product.routing';
import { ProductComponent } from './list/product.component';
import { CreateProductComponent } from './new/new.product.component';
import { DetailProductComponent } from './details/details.product.component';
import { Configuration } from '../services/product/constants.service';





import { HttpModule, RequestOptions, XHRBackend, Http } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ProductRoutes),
    NgxDatatableModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    JsonpModule
  ],
  providers: [
    Configuration,//cargar el servicio de Configuracion
  ],
  declarations: [ProductComponent, CreateProductComponent,DetailProductComponent]
})
export class ProductModule { }
