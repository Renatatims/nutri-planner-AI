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

  input NutriInput {
    meals: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    saveNutriPlan(nutriData: NutriInput!): User
  }
`;
module.exports = typeDefs;
