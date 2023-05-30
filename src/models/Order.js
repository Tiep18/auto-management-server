const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    customer: {
      customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
      },
      customerName: {
        type: String,
        required: [true, 'Customer name is required'],
      },
    },
    car: {
      carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'car',
      },
      plateNumber: {
        type: String,
        required: [true, 'Plate number is required'],
      },
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      minlength: [10, 'Phone number must be at least 10 characters'],
      maxlength: [15, 'Phone number cannot exceed 15 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      validate: {
        validator: (value) => {
          return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
        },
        message: 'Invalid email format',
      },
    },
    cars: [
      {
        carId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Car',
        },
        plateNumber: {
          type: String,
          required: true,
        },
      },
    ],

    orders: [
      {
        orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
        name: { type: String, required: true },
        date: { type: Date, required: true },
      },
    ],
  },
  { timestamps: true }
)

const Customer = mongoose.model('Customer', orderSchema)

module.exports = Customer
