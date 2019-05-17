const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./typeDefs');
const models = require('./models');
const resolvers = require('./resolvers');

const app = express();
const server = new ApolloServer({
   typeDefs,
   resolvers,
   context: ({ req }) => ({
    // authScope: getScope(req.headers.authorization),
    books: models.books,
    heros: models.heros,
  })   
});
server.applyMiddleware({ app, path: '/graphql' });
app.listen({ port: 8000 }, () => {
  console.log('🚀  Apollo Server ready at http://localhost:8000/graphql');
});
