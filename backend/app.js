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

const app = express();

app.use(cors());

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
