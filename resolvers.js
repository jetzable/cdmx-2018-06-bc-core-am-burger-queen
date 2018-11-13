module.exports = {
  Query: {
    getProductsList: async (_, args, {
      Product
    }) => {
      const productsAvailable = await Product.find({}).sort({
        name: "asc"
      });
      return productsAvailable;
    },
    getUserList: async (_, args, {
      User
    }) => {
      const users = await User.find({}).sort({
        username: "desc"
      });
      return users;
    },
    getOrderList: async (_, args, {
      Order
    }) => {
      const orders = await Order.find({}).sort({
        table: "desc"
      });
      if (!orders) {
        throw new Error("Order List empty.");
      }
      return orders;
    }
  },
  Mutation: {
    addProduct: async (_, {
      name,
      price,
      section
    }, {
      Product
    }) => {
      const product = await Product.findOne({
        name
      });
      if (product) {
        throw new Error("Product already exist");
      }
      const newProduct = await new Product({
        name,
        price,
        section
      }).save();
      return newProduct;
    },
    addUser: async (_, {
      username,
      employee
    }, {
      User
    }) => {
      const user = await User.findOne({
        username
      });
      if (user) {
        throw new Error("User already exist");
      }
      const newUser = await new User({
        username,
        employee
      }).save();
      return newUser;
    },
    addOrder: async (_, {
      table,
      employee,
      status,
      listOfProducts,
      listOfPrices
    }, {
      Order
    }) => {
      const order = await Order.findOne({
        table
      });
      if (order) {
        throw new Error('Table has a pending order.');
      }
      const newOrder = await new Order({
        table,
        employee,
        status,
        listOfProducts,
        listOfPrices
      }).save();
      return newOrder;
    },
    updateOrderStatus: async (
      _, {
        table,
        employee,
        status,
        listOfProducts,
        listOfPrices
      }, {
        Order
      }
    ) => {
      const order = await Order.findOneAndUpdate({
        table: table
      }, {
        $set: {
          table,
          employee,
          status,
          listOfProducts,
          listOfPrices
        }
      }, {
        new: true
      });
      return order;
    },
  }
};