const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Show {
        authors: [String]
        description: String
        showId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID!
        username: String!
        email: String!
        showCount: Int
        saveShow: [Show]
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }
    

    input SaveShowInput {
        authors: [String]
        title: String
        description: String
        bookId: String
        image: String
        link: String
    }


    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveShow(input: SaveShowInput): User
        removeShow(ShowId: String!): User
    }

    

    `;

    module.exports = typeDefs;