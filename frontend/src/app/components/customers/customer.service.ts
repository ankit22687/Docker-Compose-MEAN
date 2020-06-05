import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Customer } from "./customer.model";
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: "root" })
export class CustomerService {
  private customers: Customer[] = [];
  private customersUpdated = new Subject<Customer[]>();

  constructor(private http: HttpClient,
    private router: Router) { }

  getCustomers() {
    this.http.get<{ message: string, customers: any }>(environment.apiURL + '/customers')
      .pipe(map((customerData) => {
        console.log('before map')
        console.log(customerData);
        return customerData.customers.map(customer => {
          return {
            id: customer?._id,
            first_name: customer?.first_name,
            last_name: customer?.last_name,
            city: customer?.city,
            state: customer?.state
          }
        });
      }))
      .subscribe((mappedCustomers) => {
        console.log('result in service')
        console.log(mappedCustomers);
        this.customers = mappedCustomers;
        this.customersUpdated.next([...this.customers]);
      });
  }

  getCustomerUpdateListener() {
    return this.customersUpdated.asObservable();
  }

  getCustomer(customerId: string) {
    return this.http.get<{ customer: Customer }>(environment.apiURL + '/customers/' + customerId);
  }

  addCustomer(first_name: string, last_name: string, city: string, state: string) {
    const customer: Customer = { id: null, first_name: first_name, last_name: last_name, city: city, state: state };
    this.http.post<{ message: string }>(environment.apiURL + '/customers', customer).subscribe(result => {
      console.log(result);
      this.customers.push(customer);
      this.customersUpdated.next([...this.customers]);
      this.router.navigate(['/customers']);
    });
  }

  updateCustomer(id: string, first_name: string, last_name: string, city: string, state: string) {
    const customer: Customer = { id: id, first_name: first_name, last_name: last_name, city: city, state: state };
    this.http.put<{ message: string }>(environment.apiURL + '/customers/' + id, customer).subscribe(result => {
      console.log(result);

      this.router.navigate(['/customers']);
    });
  }


  deleteCustomer(customerId: string) {
    this.http.delete<{ message: string }>(environment.apiURL + '/customers/' + customerId).subscribe(result => {
      console.log(result);
      this.customers = this.customers.filter(customers => customers.id !== customerId);
      this.customersUpdated.next([...this.customers]);
    });
  }

}
