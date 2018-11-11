import {
  gql
} from "apollo-boost";

export const GET_PRODUCTS_LIST = gql `
  query {
    getProductsList {
      _id
      name
      price
      section
    }
  }
`;