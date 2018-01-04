const { GraphQLSchema } = require("graphql");
const { Mutation } = require("./Mutation");
const { Query } = require("./Query");

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
