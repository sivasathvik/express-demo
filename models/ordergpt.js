//const express= require('express');
//const bodyParser=require("body-parser");
//const sequelize = require("sequelize");
//var cors=require('cors')
// const Order = sequelize.define('Order', {
//     orderNumber: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       unique: true,
//     },
//     orderDate: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       validate: {
//         isDate: true,
//       },
//     },
//   });
  
//   const OrderTotal = sequelize.define('OrderTotal', {
//     total: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     subtotal: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     discount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     gst: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     sgst: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     cgst: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     igst: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   });
  
//   const OrderDetails = sequelize.define('OrderDetails', {
//     billInfo: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       unique: true,
//     },
//     paymentMethod: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     shippingInfo: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     shippingMethod: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   });
  
//   const Item = sequelize.define('Item', {
//     itemName: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     skew: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       unique: true,
//     },
//     price: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//   });
  
//   // Associations
//   Order.hasOne(OrderTotal);//88,91 1-1 reln
//   OrderTotal.belongsTo(Order);
  
//   OrderTotal.hasOne(Order);
//   Order.belongsTo(OrderTotal);//89,92 many to many reln 
  
//   OrderDetails.hasMany(Item);
//   Item.belongsTo(OrderDetails);
  
//   // Synchronize the models with the database
//   sequelize.sync({ force: true }) // Note: force: true will drop and recreate tables on every sync
//     .then(() => {
//       console.log('Tables created successfully!');
//     })
//     .catch((error) => {
//       console.error('Error creating tables:', error);
//     });
  
//   // Export the models
//   module.exports = {
//     Order,
//     OrderTotal,
//     OrderDetails,
//     Item,
//   };
//   return Order;

// Import Sequelize and DataTypes from Sequelize
const { Sequelize, DataTypes } = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize('sql', 'postgres', '#Sathvik21', {
  host: 'localhost',
  dialect: 'postgres', // Use 'postgres' for PostgreSQL
});

// Define the models
const Order = sequelize.define('Order', {
  orderNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
    unique: true,
  },
  orderDate: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: true,
    },
  },
});

const OrderTotal = sequelize.define('OrderTotal', {
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subtotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  discount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gst: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sgst: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cgst: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  igst: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const OrderDetails = sequelize.define('OrderDetails', {
  billInfo: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shippingInfo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  shippingMethod: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

const Item = sequelize.define('Item', {
  itemName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  skew: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

// Associations
// Order.hasOne(OrderTotal);
// OrderTotal.belongsTo(Order);

// OrderTotal.hasOne(Order);
// Order.belongsTo(OrderTotal);

// OrderDetails.hasMany(Item);
// Item.belongsTo(OrderDetails);
// Associations
Order.hasOne(OrderTotal);
OrderTotal.belongsTo(Order);

Order.hasMany(OrderDetails);
OrderDetails.belongsTo(Order);

OrderDetails.hasMany(Item);
Item.belongsTo(OrderDetails);


// Synchronize the models with the database
sequelize.sync({ force: true }) // Note: force: true will drop and recreate tables on every sync
  .then(() => {
    console.log('Tables created successfully!');
    // Start the server after tables are created
    StartServer();
  })
  .catch((error) => {
    console.error('Error creating tables:', error);
  });

function StartServer() {
  const app = express();
  const port = 3002;

  // Middleware to parse JSON requests
  app.use(bodyParser.json());

  // POST endpoint to add data to the tables
  app.post('/addData', async (req, res) => {
    try {
      // Create an order total
      const orderTotalData = req.body.orderTotal;
      const orderTotal = await OrderTotal.create(orderTotalData);

      // Create an order and associate it with the order total
      const orderData = req.body.order;
      const order = await Order.create(orderData);
      order.setOrderTotal(orderTotal);

      // Create order details
      const orderDetails = await OrderDetails.create(req.body.orderDetails);

      // Create items and associate them with order details
      for (const itemData of req.body.items) {
        const item = await Item.create(itemData);
        orderDetails.addItem(item);
      }

      res.status(201).json({ message: 'Data added successfully!' });
    } catch (error) {
      console.error('Error adding data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

  
  