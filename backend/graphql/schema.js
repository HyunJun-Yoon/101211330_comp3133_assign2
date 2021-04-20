const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        user_id: Int!
        username: String!
        password: String!
        email: String!
    }
    type UserData {
        users: [User!]!
    }
    type RootQuery {
        users: UserData!
    }
    input UserInputData {
        user_id: Int!
        username: String!
        password: String!
        email: String!
    }
    type RootMutation {
        addUser(userInput: UserInputData ): User!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }

`);
