const { gql } = require('apollo-server');

module.exports = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # This "Book" type can be used in other type declarations.
  type Book {
    title: String
    author: String
  }

  type Friend {
    id: String
    name: String
    appearsIn: [String]
  }

  type Hero {
    id: String
    name: String
    friends: [Friend]
    appearsIn: [String]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    books: [Book]
    heros: [Hero]
    hero: Hero
  }
`;
