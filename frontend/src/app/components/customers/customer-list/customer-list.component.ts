import { Component, OnInit, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NGXLogger } from 'ngx-logger';
import { Title } from '@angular/platform-browser';

import { NotificationService } from '../../core/services/notification.service';
import { Router } from '@angular/router';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { MatPaginator } from '@angular/material/paginator';
import { BehaviorSubject, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../../core/services/spinner.service';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['first_name', 'last_name', 'city', 'state', 'edit_columns'];
  dataSource = new MatTableDataSource<Customer>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private loadingSubject = new BehaviorSubject<boolean>(false);
  //public loading$ = this.loadingSubject.asObservable();
  public loading$ = new Subject<boolean>();
  constructor(
    private logger: NGXLogger,
    private notificationService: NotificationService,
    private titleService: Title,
    private router: Router,
    private customerService: CustomerService,
    private spinnerService: SpinnerService,
  ) { }

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Customers');
    this.logger.log('Customers loaded');
    //this.spinnerService.show();
  }

  ngAfterViewInit() {
    this.getCustomers();
  }

  getCustomers() {
    this.loading$.next(true);




    this.customerService.getCustomers();
    this.customerService.getCustomerUpdateListener()
      .pipe(finalize(() => {
        console.log('in finalie');
        this.loading$.next(false)
      }))
      .subscribe((result) => {
        console.log('in result');
        console.log(result);
        this.loadingSubject.next(true);
        this.dataSource.data = result;
        console.log(this.dataSource);
        this.dataSource.sort = this.sort;
        //this.loading$ = false;
        //this.loader.stopSpinner();
        this.loading$.complete();
      }, error => {
        //this.loader.stopSpinner();
      });

  }

  addCustomer() {
    this.router.navigate(['/customers/add-customer']);
  }

  editCustomer(customerId) {
    this.router.navigate(['/customers/edit-customer/' + customerId]);
  }

  deleteCustomer(customerId: string) {
    this.customerService.deleteCustomer(customerId);
  }

}
