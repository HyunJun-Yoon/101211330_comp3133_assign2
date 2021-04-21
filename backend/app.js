// var express = require('express');
// var app = express();

// app.set('port', process.env.port || 3000);

// app.get('/', (req, res) => {
//   res.send('Hello');
// });

// app.listen(app.get('port'), function (err, res) {
//   console.log('Server is running on port', app.get('port'));
// });
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

const Post = require('./models/users');

//Login Validation with Credentials and Issue token
app.post('/login', (req, res, next) => {
  console.log(req.body);
  let fetchedUser;
  Post.findOne({ email: req.body.email })
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

// // server();
// const bodyParser = require('body-parser');
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const { graphqlHTTP } = require('express-graphql');

// const graphqlSchema = require('./graphql/schema');
// const graphqlResolver = require('./graphql/resolvers');

// const app = express();

// app.use(bodyParser.json());

// app.use(cors());

// graphql
// app.use(
//     '/graphql',
//     graphqlHTTP({
//         schema: graphqlSchema,
//         rootValue: graphqlResolver,
//         graphiql: true,
//     })
// )

// try {
//   mongoose
//     .connect(
//       'mongodb+srv://hyunjun:wjstjf1443@cluster0.7abhc.mongodb.net/gbc_full_stack?retryWrites=true&w=majority',
//       { useNewUrlParser: true },
//       { useUnifiedTopology: true }
//     )
//     .then(() => {
//       app.listen(3000, console.log('Connecting to Port 3000.'));
//     });
// } catch (error) {
//   console.log(error);
// }
