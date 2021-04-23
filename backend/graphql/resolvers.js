const User = require('../models/users');
const Hotel = require('../models/hotels');
const HotelBooking = require('../models/hotelBookings');

module.exports = {
  users: async function () {
    const users = await User.find();
    return {
      users: users.map(item => {
        return {
          ...item._doc,
          user_id: item.user_id.toString()
        };
      })
    };
  },
  addUser: async function ({ userInput }) {
    const user = new User({
      user_id: userInput.user_id,
      username: userInput.username,
      password: userInput.password,
      email: userInput.email
    });
    const addUser = await user.save();
    return {
      ...addUser._doc,
      user_id: addUser.user_id.toString()
    };
  },

  bookHotel: async function ({ bookInput }) {
    const hotelBooking = new HotelBooking({
      hotel_id: bookInput.hotel_id,
      booking_date: bookInput.booking_date,
      booking_start: bookInput.booking_start,
      booking_end: bookInput.booking_end,
      user_id: bookInput.user_id
    });
    const bookHotel = await hotelBooking.save();
    return {
      ...bookHotel._doc,
      booking_date: bookHotel.booking_date.toString()
    };
  },

  hotels: async function () {
    const hotels = await Hotel.find();
    return {
      hotels: hotels.map(item => {
        return {
          ...item._doc,
          hotel_id: item.hotel_id.toString()
        };
      })
    };
  }
};
