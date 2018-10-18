module.exports = {
  Query: {
    getUser: () => null,
    getDrinkList: async (_, args, { Drink }) => {
      const drinks = await Drink.find({}).sort({ name: "desc" });
      return drinks;
    },
    getFoodList: async (_, args, { Food }) => {
      const foodies = await Food.find({}).sort({ name: "desc" });
      return foodies;
    },
    getOrderList: async (_, args, { Order }) => {
      const orders = await Order.find({}).sort({ client: "desc" });
      return orders;
    }
  },
  Mutation: {
    signupUser: async (_, { username, password }, { User }) => {
      const user = await User.findOne({
        username
      });
      if (user) {
        throw new Error("Username already exist");
      }
      const newUser = await new User({
        username,
        password
      }).save();
      return newUser;
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
    addFood: async (_, { name, price, shift, extra, side }, { Food }) => {
      const food = await Food.findOne({
        name
      });
      if (food) {
        throw new Error("Food already exist");
      }
      const newFood = await new Food({
        name,
        price,
        shift,
        extra,
        side
      }).save();
      return newFood;
    },
    addOrder: async (
      _,
      { food, drink, total, client, employee },
      { Order }
    ) => {
      const newOrder = await new Order({
        food,
        drink,
        total,
        client,
        employee
      }).save();
      return newOrder;
    }
  }
};
