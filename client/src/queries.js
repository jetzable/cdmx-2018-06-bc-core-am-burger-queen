import { gql } from "apollo-boost";

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

export const GET_SIDES_LIST = gql`
  query {
    getSidesList {
      _id
      name
      price
    }
  }
`;

export const GET_EXTRAS_LIST = gql`
  query {
    getExtrasList {
      _id
      name
      price
    }
  }
`;
