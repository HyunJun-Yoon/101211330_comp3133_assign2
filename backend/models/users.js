const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: [true, 'Please enter user ID'],
    // unique: [true, 'User ID already exists'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Please enter username'],
    lowercase: true,
    trim: true
    // unique: [true, 'Duplicate username not allowed']
  },
  password: {
    type: String,
    required: [true, 'Please enter password']
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
    trim: true
    // unique: [true, 'Duplicate email not allowed'],
    // validate: function (value) {
    //   var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    //   return emailRegex.test(value);
    // }
  }
  // bookHotel: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'HotelBooking'
  //   }
  // ]
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
