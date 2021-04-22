import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private service: DashboardService) {}
  hotelList: any = [];
  Bookings: any = [];
  BookedHotel: any = [];
  currentUser: any;

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    const email = localStorage.getItem('email');
    console.log(email);
    this.service.getUser({ email: email }).subscribe(
      (res) => {
        let temp: any = res;
        if (temp.result) {
          this.currentUser = temp.result;
        } else {
        }
      },
      (err) => {
        // alert('Not available');
        console.log(err);
      }
    );
  }

  getHotel() {
    this.service.getHotel().subscribe(
      (res) => {
        let temp: any = res;
        if (temp.result) {
          this.hotelList = temp.result;
        } else {
        }
      },
      (err) => {
        // alert('Not available');
        console.log(err);
      }
    );
  }

  getBooking() {
    const user_id = this.currentUser[0]['user_id'];
    this.service.getBooking({ user_id: user_id }).subscribe(
      (res) => {
        let temp: any = res;
        if (temp.result) {
          this.Bookings = temp.result;
          this.BookedHotel = temp.BookedHotel;
        } else {
        }
      },
      (err) => {
        // alert('Not available');
        console.log(err);
      }
    );
  }
}
