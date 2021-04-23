const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        user_id: Int!
        username: String!
        password: String!
        email: String!
    }
    type Hotel {
        hotel_id: Int!
        hotel_name: String!
        street: String!
        city: String!
        postal_code: String!
        price: Float!
        email: String!
        user_id: Int!
    }
    type HotelBooking {
        hotel_id: Int!
        booking_date: String!
        booking_start: String!
        booking_end: String!
        user_id: Int!
    }
    type UserData {
        users: [User!]!
    }
    type BookingData{
        bookings: [HotelBooking]!
    }
    type RootQuery {
        users: UserData!
        bookings: BookingData!
    }
    input UserInputData {
        user_id: Int!
        username: String!
        password: String!
        email: String!
    }
    input BookInputData{
        hotel_id: Int!
        booking_date: String!
        booking_start: String!
        booking_end: String!
        user_id: Int!
    }
    type RootMutation {
        addUser(userInput: UserInputData ): User!
        bookHotel(bookInput: BookInputData): HotelBooking!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }

`);
