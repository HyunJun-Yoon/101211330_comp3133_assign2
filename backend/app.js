const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
//graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true
  })
);

try {
  mongoose
    .connect(
      'mongodb+srv://hyunjun:wjstjf1443@cluster0.7abhc.mongodb.net/gbc_full_stack?retryWrites=true&w=majority',
      { useNewUrlParser: true },
      { useUnifiedTopology: true }
    )
    .then(() => {
      app.listen(3000, console.log('Connecting to Port 3000.'));
    });
} catch (error) {
  console.log(error);
}

const User = require('./models/users');
const Hotel = require('./models/hotels');
const HotelBooking = require('./models/hotelBookings');

//Login Validation with Credentials and Issue token
app.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(result => {
      console.log(req.body.password + '||' + result.password);
      if (!result) {
        return res.status(401).json({
          messege: 'Authorization Failed..!!',
          result: result
        });
      }
      fetchedUser = result;
      return req.body.password == result.password;
    })
    .then(result => {
      console.log(result, '*************');
      if (!result) {
        return res.status(401).json({
          messege: 'Authorization Failed..!!#',
          result: 'false'
        });
      }
      //Creation of Token Since Credentials are matched
      const payload = {
        email: fetchedUser.email
      };
      //Secret key to issue JWT token
      const secret = 'kadndak#$%^&*dfreqofn2oa2141341';
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      //Sending Token
      res.status(200).json({
        messege: 'Authorization Success..!!',
        token: token,
        email: fetchedUser.email,
        result: 'true'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(401).json({
        messege: 'Authorization Failed..!!',
        result: 'false'
      });
    });
});

//Login Validation with token for (Angular Route Guard) Note: Input Token as header
app.get(
  '/validation',
  (req, res, next) => {
    console.log(req.body);
    token = req.headers.authorization;
    console.log(token);
    const secret = 'kadndak#$%^&*dfreqofn2oa2141341';
    try {
      let payload = jwt.verify(token, secret);
      console.log(payload);
      res.status(200).json({
        result: true,
        payload: jwt.verify(token, secret)
      });
    } catch {
      res.status(401).json({
        result: false
      });
    }
  },
  err => {
    console.log(err);
    res.status(500).json({
      result: false
    });
  }
);

app.post('/getUser', (req, res) => {
  User.find({ email: req.body.email }).then(result => {
    if (!result) {
      return res.status(401).json({
        messege: 'User not found',
        result: result
      });
    }
    res.status(200).json({
      result: result
    });
  });
});

app.get('/getHotel', (req, res, next) => {
  Hotel.find({}).then(result => {
    if (!result) {
      return res.status(401).json({
        messege: 'Hotel not found',
        result: result
      });
    }
    res.status(200).json({
      result: result
    });
  });
});

app.post('/getBooking', (req, res) => {
  HotelBooking.find({ user_id: req.body.user_id }).then(result => {
    if (!result) {
      return res.status(401).json({
        messege: 'Hotel not found',
        result: result
      });
    }

    const getBookedHotel = result => {
      const data = Promise.all(
        result.map(item => {
          return Hotel.findOne({ hotel_id: item.hotel_id });
        })
      );
      return data;
    };

    getBookedHotel(result).then(data => {
      res.status(200).json({
        result: result,
        BookedHotel: data
      });
    });
  });
});
