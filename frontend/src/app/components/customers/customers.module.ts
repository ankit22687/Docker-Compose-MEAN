import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersRoutingModule } from './customers-routing.module';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { BaseModule } from '../base/base.module';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerService } from './customer.service';

@NgModule({
  imports: [
    CommonModule,
    CustomersRoutingModule,
    BaseModule
  ],
  declarations: [
    CustomerListComponent,
    AddCustomerComponent,

  ],
  providers: [
    CustomerService
  ],
  entryComponents: [
  ]
})
export class CustomersModule { }
