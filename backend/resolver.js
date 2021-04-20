const Hotel = require('./models/hotels');
const HotelBooking = require('./models/hotelBookings');
const User = require('./models/users');

export const resolvers = {
  Query: {
    getHotel: async (parent, args) => {
      return await Hotel.find({});
    },
    getHotelByCity: async (parent, args) => {
      return await Hotel.find({ city: args.city });
    },
    getHotelBooking: async (parent, args) => {
      return await HotelBooking.find({});
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      const isValidEmail = emailExpression.test(
        String(args.email).toLowerCase()
      );

      if (!isValidEmail) {
        throw new Error('Email is not valid');
      }

      let newUser = new User({
        user_id: args.user_id,
        username: args.username,
        password: args.password,
        email: args.email
      });
      return await newUser.save();
    }
  }
};
