import { Routes } from '@angular/router';

import { ProductComponent } from './list/product.component';
import { CreateProductComponent } from './new/new.product.component';
import { DetailProductComponent } from './details/details.product.component';

export const ProductRoutes: Routes = [
  {
    path: '',
    children: [{
      path: 'all',
      component: ProductComponent,
      data: {
        heading: 'Products'
      }
    },
    {
      path: 'create',
      component: CreateProductComponent,
      data: {
        heading: 'Create Product'
      }
    },
    {
      path: 'details/:id',
      component: DetailProductComponent,
      data: {
        heading: 'Details'
      }
    }
    ]
  }
];
