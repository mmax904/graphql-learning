const { ApolloServer, gql } = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginCacheControl
} = require('apollo-server-core');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String
    author: String
  }

  input BookInput {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }

  type Mutation {
    createBook(input: BookInput): Book
    updateBook(id: ID!, input: BookInput): Book
  }
`;

const books = [
  {
    id: '1',
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    id: '2',
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    books: (parent, args, context, info) => books,
  },
  Mutation: {
    createBook: (_,{input: {title, author}}) => {
      const book = { id: `${books.length+1}`, title, author }
      books.push(book);
      return book;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
    ApolloServerPluginCacheControl({
      defaultMaxAge: 10000,
      // Don't send the `cache-control` response header.
      calculateHttpHeaders: false,
    }),
  ],
});

server.listen(4000).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});