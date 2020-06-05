import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/auth.service';
import { NGXLogger } from 'ngx-logger';
import { SpinnerService } from '../../core/services/spinner.service';
import { NotificationService } from '../../core/services/notification.service';
import { CustomerService } from '../customer.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  form: FormGroup;
  disableSubmit: boolean;
  customerId: string = null;
  private customer: Customer
  constructor(private authService: AuthenticationService,
    private logger: NGXLogger,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService,
    private customerService: CustomerService,
    private route: ActivatedRoute) {


  }

  ngOnInit() {
    this.createCustomerForm();

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('customerId')) {
        this.customerId = paramMap.get('customerId');
        this.customerService.getCustomer(this.customerId).subscribe((customer: any) => {
          this.customer = {
            id: customer._id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            city: customer.city,
            state: customer.state,
          };
          // patch the value of customer form
          this.patchCustomerForm();
        });

      }
    });
  }

  createCustomerForm() {
    this.form = new FormGroup({
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
    });
  }

  patchCustomerForm() {
    console.log('in patch value');
    console.log(this.customer);
    this.form.patchValue({
      first_name: this.customer.first_name,
      last_name: this.customer.last_name,
      city: this.customer.city,
      state: this.customer.state
    })
  }

  addCustomer() {
    this.customerService.addCustomer(this.form.value.first_name,
      this.form.value.last_name,
      this.form.value.state,
      this.form.value.city);
  }

  updateCustomer() {
    this.customerService.updateCustomer(this.customer.id,
      this.form.value.first_name, this.form.value.last_name,
      this.form.value.city, this.form.value.state);
  }


}
