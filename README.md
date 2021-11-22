## Schema/typeDefs
Responsible for defining the structure of data that clients can query
A schema is a collection of type definitions (hence "typeDefs")
that together define the "shape" of queries that are executed against
your data.
  - Special type
    - type Query: Used to fetch data
    - type Mutation: Used for updating the data
  - Custom type(used for defining structure inside Query type)
    - type AnyMeaningfulName for data structure
    - enum {}

## Resolvers
Resolvers define the technique for fetching the types defined in the
schema.
  - type Query
    Resolvers tell how to fetch the data associated with a particular type.
    It must return the data as defined in the type
  - type Mutation
    Used to send/update data

## Directives(@anyName)


## Calls

query Books {
	books {
    id
    title
  }
}

mutation CreateBook{
  createBook(input: {
    author: "Manish",
    title: "Learning GraphQL",
  }) {
    id
    title
  }
}