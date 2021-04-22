const User = require('../models/users');
const Hotel = require('../models/hotels');

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
