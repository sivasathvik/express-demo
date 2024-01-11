module.exports=(sequelize,DataTypes) => {
    const User=sequelize.define("order", {
        number: {
            type:DataTypes.number,
            unique:true,
            allowNull:true
        },
        date:{
            type:DataTypes.date,
            unique:false,
            isDate:true,
            allowNull:false
        },
        total: {
            type:DataTypes.number,
            allowNull: false,
            Subtotal: {
                type:DataTypes.number,
                allowNull: false,

            },
            Discount: {
                type:DataTypes.number,
                allowNull: false,
            },
            Gst: {
                type:DataTypes.number,
                allowNull: false,
                Sgst: {
                    type:DataTypes.number,
                    allowNull: false,
                },
                Cgst: {
                    type:DataTypes.number,
                    allowNull: false,
                },
                Igst: {
                    type:DataTypes.number,
                    allowNull: false,
                }

            },
            Totalamount: {
                type:DataTypes.number,
                allowNull: false,
            },


        },
        Details: {
            BillInfo: {
                type:DataTypes.STRING,
                allowNull:true,
                unique:true,
            },
            PaymentMethod: {
                type:DataTypes.STRING,
                allowNull:true,

            },
            Items: {
                Itemname: {
                    type:DataTypes.STRING,
                    allowNull:true,
                },
                Quantity: {
                    type:DataTypes.NUMBER,
                    allowNull:true,

                },
                skew: {
                    type:DataTypes.STRING,
                    allowNull:true,
                    unique:true,

                },
                price: {
                    type:DataTypes.NUMBER,
                    allowNull:true,
                }
            },
            Shipping : {
                Info: {
                    type:DataTypes.STRING,
                    allowNull:true,
                    unique:true,

                },
                Method: {
                    type:DataTypes.STRING,
                    allowNull:true,
                }
    
            },

        },
        salt: {
            type:DataTypes.STRING,
            allowNull: true,
            unique: false,
    
        }
    }, {timestamps: true}, );
    return User;
    };

    //JSON OBJECT SENT FROM POSTMAN FOR ORDERGPT CODE
    // {
    //     "orderTotal": {
    //       "total": 100,
    //       "subtotal": 90,
    //       "discount": 10,
    //       "gst": 5,
    //       "sgst": 2,
    //       "cgst": 2,
    //       "igst": 0
    //     },
    //     "order": {
    //       "orderNumber": 123,//Unique
    //       "orderDate": "2024-01-10"
    //     },
    //     "orderDetails": {
    //       "billInfo": "Billing Information",//Unique
    //       "paymentMethod": "Credit Card",
    //       "shippingInfo": "Shipping Information",
    //       "shippingMethod": "Express"
    //     },
    //     "items": [
    //       {
    //         "itemName": "Item 1",
    //         "quantity": 2,
    //         "skew": "SKU123",//Unique
    //         "price": 50
    //       },
    //       {
    //         "itemName": "Item 2",
    //         "quantity": 3,
    //         "skew": "SKU456",//Unique
    //         "price": 30
    //       }
    //     ]
    //   }
      