const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  hotel_id: {
    type: Number,
    required: [true, 'Please enter user ID'],
    unique: [true, 'Hotel ID already exists'],
    trim: true
  },
  booking_date: {
    type: String,
    default: Date.now(),
    required: [true, 'Please eneter date of booking']
  },
  booking_start: {
    type: String,
    required: [true, 'Please enter date of starting']
  },
  booking_end: {
    type: String,
    required: [true, 'Please enter date of ending']
  },
  user_id: {
    type: Number,
    ref: 'User'
  }
});

const HotelBooking = mongoose.model('HotelBooking', BookingSchema);
module.exports = HotelBooking;
