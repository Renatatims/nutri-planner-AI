const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    nutriPlans: [Nutri]
  }

  type Nutri {
    meals: String
  }

  type Query {
    user: User
  }

  type Mutation {
    login(email: String!, password: String!)
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    )
  }
`;
module.exports = typeDefs;
