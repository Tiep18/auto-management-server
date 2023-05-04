require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const nocache = require('nocache')
// const mongoose = require('mongoose');

const app = express()

// Middleware
app.use(express.json())
app.set('json spaces', 2)

app.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        'default-src': ["'none'"],
        'frame-ancestors': ["'none'"],
      },
    },
    frameguard: {
      action: 'deny',
    },
  })
)

app.use((req, res, next) => {
  res.contentType('application/json; charset=utf-8')
  next()
})
app.use(nocache())

app.use(
  cors({
    // origin: CLIENT_ORIGIN_URL,
    methods: ['GET'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    maxAge: 86400,
  })
)

// Routes
// TODO: Define your routes here

// Connect to MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error(err));

// Start the server
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})