import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const SAVE_NUTRI_PLAN = gql`
  mutation saveNutriPlan($nutriData: NutriInput!) {
    saveNutriPlan(nutriData: $nutriData) {
      _id
      nutriPlans {
        meals
      }
    }
  }
`;