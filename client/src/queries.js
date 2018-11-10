import { gql } from "apollo-boost";

/* User Mutations */
export const SIGNIN_USER = gql`
  mutation($username: String!, $password: String!) {
    signinUser(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

/* User Queries */
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      password
    }
  }
`;

export const GET_FOOD_LIST = gql`
  query {
    getFoodList {
      _id
      name
      price
      shift
    }
  }
`;

export const GET_DRINK_LIST = gql`
  query {
    getDrinkList {
      _id
      name
      price
    }
  }
`;
