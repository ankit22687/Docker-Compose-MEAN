import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public visibility = new BehaviorSubject<boolean>(false);

  // constructor() {
  //   this.visibility = new BehaviorSubject<boolean>(false);
  //   this.visibility$ = this.visibility.asObservable();
  // }



}
