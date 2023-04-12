import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  {
    user {
      _id
      firstName
      lastName
      email
      nutriPlans {
        _id
        meals
        title
        user {
          _id
          firstName
          lastName
          email
        }
      }    
    }
  }
`;

export const QUERY_NUTRI_PLANS = gql`
  query getNutriPlans {
    nutriPlans {
      _id
      title
      meals
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;