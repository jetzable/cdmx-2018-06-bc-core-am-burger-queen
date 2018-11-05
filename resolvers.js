const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
  const { username, password } = user;
  return jwt.sign({ username, password }, secret, { expiresIn });
};

module.exports = {
  Query: {
    getUser: () => null,
    getCurrentUser: async (_, args, { User, currentUser }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({
        username: currentUser.username
      });

      return user;
    },
    getDrinkList: async (_, args, { Drink }) => {
      const drinks = await Drink.find({}).sort({ name: "desc" });
      return drinks;
    },
    getFoodList: async (_, args, { Food }) => {
      const foodies = await Food.find({}).sort({ name: "desc" });
      return foodies;
    },
    getExtraList: async (_, args, { Extra }) => {
      const extras = await Extra.find({}).sort({ name: "desc" });
      return extras;
    },
    getSideList: async (_, args, { Side }) => {
      const sides = await Side.find({}).sort({ name: "desc" });
      return sides;
    },
    getOrderList: async (_, args, { Order }) => {
      const orders = await Order.find({}).sort({ client: "desc" });
      return orders;
    }
  },
  Mutation: {
    signinUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },
    signupUser: async (_, { username, email, password }, { User }) => {
      const user = await User.findOne({ username });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        username,
        email,
        password
      }).save();
      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
    addDrink: async (_, { name, price }, { Drink }) => {
      const drink = await Drink.findOne({
        name
      });
      if (drink) {
        throw new Error("Drink already exist");
      }
      const newDrink = await new Drink({
        name,
        price
      }).save();
      return newDrink;
    },
    addExtra: async (_, { name, price }, { Extra }) => {
      const extra = await Extra.findOne({
        name
      });
      if (extra) {
        throw new Error("Extra already exist");
      }
      const newExtra = await new Extra({
        name,
        price
      }).save();
      return newExtra;
    },
    addSide: async (_, { name, price }, { Side }) => {
      const side = await Side.findOne({
        name
      });
      if (side) {
        throw new Error("Side already exist");
      }
      const newSide = await new Side({
        name,
        price
      }).save();
      return newSide;
    },
    addFood: async (_, { name, price, shift }, { Food }) => {
      const food = await Food.findOne({
        name
      });
      if (food) {
        throw new Error("Food already exist");
      }
      const newFood = await new Food({
        name,
        price,
        shift
      }).save();
      return newFood;
    },
    addOrder: async (
      _,
      { food, drink, total, client, employee, extra, side, table },
      { Order }
    ) => {
      const newOrder = await new Order({
        food,
        drink,
        total,
        client,
        employee,
        extra,
        side,
        table
      }).save();
      return newOrder;
    }
  }
};
