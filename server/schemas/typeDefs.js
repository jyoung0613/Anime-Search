const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
    }
    
    type Auth {
        token: ID!
        user: User
    }

    type Show {
        showId: ID!
        name: String!
        type: String!
        image: String!
    }

    type Query {
        me: User
    }
    
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
    `;

    module.exports = typeDefs;