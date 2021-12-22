const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        showCount: Int
        savedShows: [Show]
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Show {
        showId: ID!
        title: String
        overview: String
        thumbnail_url: String
        web_url: String
    }

    type InputShow {
        showId: String
        title: String
        overview: String
        thumbnail_url: String
        web_url: String
    }

    type Query {
        me: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveShow(newShow: InputShow!): User
        removeShow(showId: ID!): User
    }
    `;

    module.exports = typeDefs;