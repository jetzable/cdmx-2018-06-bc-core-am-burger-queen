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

export const GET_ORDER_LIST = gql `
query {
  getOrderList {
    table
    employee
    status
    listOfProducts
    listOfPrices
  }
}
`;

export const ADD_ORDER = gql `
  mutation(
    $table: Int!
    $employee: ID!
    $status: Boolean!
    $listOfProducts: [String]!
    $listOfPrices: [Int]!
  ) {
    addOrder(
      table: $table
      employee: $employee
      status: $status
      listOfProducts: $listOfProducts
      listOfPrices: $listOfPrices
    ) {
      _id
      table
      employee
      status
      listOfProducts
      listOfPrices
    }
  }
`;