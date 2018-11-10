const { ApolloServer, gql } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });
const fs = require("fs");
const path = require("path");

const Drink = require("./models/Drink");
const Extra = require("./models/Extra");
const Side = require("./models/Side");
const Food = require("./models/Food");
const Order = require("./models/Order");
const User = require("./models/User");

const resolvers = require("./resolvers");
const filePath = path.join(__dirname, "typeDefs.gql");
const typeDefs = fs.readFileSync(filePath, "utf-8");

mongoose
  .connect(
    process.env.MONGO_URI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Base de datos conectada"))
  .catch(error => console.log(error));

// Verify JWT Token passed from client
const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw new AuthenticationError(
        "Your session has ended. Please sign in again."
      );
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // formatError: error => ({
  //   name: error.name,
  //   message: error.message.replace("Context creation failed:", "")
  // }),
  // context: async ({ req }) => {
  //   const token = req.headers["authorization"];
  //   return { User, currentUser: await getUser(token) };

  // }

  context: {
    Drink,
    Food,
    Side,
    Extra,
    User,
    Order
  }
});

// { port: process.env.PORT || 4000 }
server.listen().then(({ url }) => {
  console.log("Servidor activo ", url);
});
