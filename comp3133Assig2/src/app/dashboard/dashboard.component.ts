import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import moment from 'moment';

const BOOK_HOTEL = gql`
  mutation bookHotel(
    $hotel_id: Int!
    $booking_date: String!
    $booking_start: String!
    $booking_end: String!
    $user_id: Int!
  ) {
    bookHotel(
      bookInput: {
        hotel_id: $hotel_id
        booking_date: $booking_date
        booking_start: $booking_start
        booking_end: $booking_end
        user_id: $user_id
      }
    ) {
      booking_date
    }
  }
`;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  checkIn: FormGroup;
  constructor(private apollo: Apollo, private service: DashboardService) {
    if (!localStorage.getItem('token')) {
      location.replace('/login');
    }
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.checkIn = new FormGroup({
      start: new FormControl(new Date(year, month, today.getDate())),
      end: new FormControl(new Date(year, month, today.getDate() + 2)),
    });
  }
  hotelList: any = [];
  Bookings: any = [];
  BookedHotel: any = [];
  currentUser: any;
  selectedHotel: any;
  hotelName: any;

  ngOnInit(): void {
    this.getUser();
    this.getHotel();
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

  bookHotel(selectedHotel: any) {
    this.selectedHotel = selectedHotel;
  }

  submit() {
    if (
      this.BookedHotel.some(
        (item: { [x: string]: any }) =>
          item['hotel_id'] === this.selectedHotel['hotel_id']
      )
    ) {
      alert('already booked this hotel');
    } else {
      this.apollo
        .mutate({
          mutation: BOOK_HOTEL,
          variables: {
            hotel_id: this.selectedHotel['hotel_id'],
            booking_date: moment(new Date()).format('MM DD YYYY'),
            booking_start: moment(this.checkIn.value.start).format(
              'MM DD YYYY'
            ),
            booking_end: moment(this.checkIn.value.end).format('MM DD YYYY'),
            user_id: this.currentUser[0]['user_id'],
          },
        })
        .subscribe(() => {
          alert(
            'Booking Completed!' +
              '\n Check In: ' +
              moment(this.checkIn.value.start).format('MMMM d, YYYY') +
              '\n Check Out: ' +
              moment(this.checkIn.value.end).format('MMMM d, YYYY')
          );
          this.exit();
        });
    }
  }

  exit() {
    location.reload();
  }

  Search() {
    this.ngOnInit;

    if (this.hotelName !== '') {
      this.hotelList = this.hotelList.filter((res: { hotel_name: string }) => {
        return res.hotel_name
          .toLocaleLowerCase()
          .match(this.hotelName.toLocaleLowerCase());
      });
    } else if (this.hotelName.length < 1) {
      this.ngOnInit;
    }
  }
}
