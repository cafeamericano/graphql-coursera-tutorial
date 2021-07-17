const fs = require('fs');
const http = require('http');
const { ApolloServer, gql } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const db = require('./db');

const port = 9000;
const jwtSecret = Buffer.from('Zn8Q5tyZ/G1MHltc4F/gTkVJMlrbKiZt', 'base64');

const app = express();
app.use(cors(), bodyParser.json(), expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));

// GRAPHQL ITEMS
const typeDefs = gql(fs.readFileSync('./schema.graphql', {encoding: 'utf8'}));
const resolvers = require('./resolvers');

const context = ({req, connection}) => {
  if (req && req.user) {
    return {
      user: req.user && db.users.get(req.user.sub),
      userId: req.user.sub
    };
  }
  if (connection && connection.context && connection.context.accessToken) {
    const decodedToken = jwt.verify(connection.context.accessToken, jwtSecret);
    return {
      user: req.user && db.users.get(req.user.sub),
      userId: decodedToken.sub
    };
  }
}

const apolloServer = new ApolloServer({typeDefs, resolvers, context});
apolloServer.applyMiddleware({app, path: '/graphql'});

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  const user = db.users.list().find((user) => user.email === email);
  if (!(user && user.password === password)) {
    res.sendStatus(401);
    return;
  }
  const token = jwt.sign({sub: user.id}, jwtSecret);
  res.send({token});
});

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);
httpServer.listen(port, () => console.log(`Server started on port ${port}`));