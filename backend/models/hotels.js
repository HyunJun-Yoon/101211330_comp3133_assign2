const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  hotel_id: {
    type: Number,
    required: [true, 'Please enter user ID'],
    unique: [true, 'Hotel ID already exists'],
    trim: true
  },
  hotel_name: {
    type: String,
    required: [true, 'Please enter hotel name']
  },
  street: {
    type: String,
    required: [true, 'Please enter street']
  },
  city: {
    type: String,
    required: [true, 'Please enter city']
  },
  postal_code: {
    type: String,
    required: [true, 'Please enter postal code'],
    uppercase: true,
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Please enter price'],
    default: 0.0,
    validate(value) {
      if (value < 0.0) {
        throw new Error('Negative number is not allowed');
      }
    }
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
    trim: true,
    unique: [true, 'Duplicate email not allowed'],
    validate: function (value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  },
  user_id: {
    type: Number,
    required: [true, 'Please enter user ID'],
    unique: [true, 'User id already exists'],
    trim: true
  }
});

const Hotel = mongoose.model('Hotel', HotelSchema);
module.exports = Hotel;
