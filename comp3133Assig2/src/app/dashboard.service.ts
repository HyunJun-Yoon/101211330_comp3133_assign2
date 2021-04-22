import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  rootUrl = 'http://localhost:3000/';
  //Created an Observable with False as default value
  loginStatus = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  getUser(obj: any) {
    return this.http.post(this.rootUrl + 'getUser', obj);
  }
  getHotel() {
    return this.http.get(this.rootUrl + 'getHotel');
  }

  getBooking(obj: any) {
    return this.http.post(this.rootUrl + 'getBooking', obj);
  }
}
