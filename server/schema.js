const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const axios = require("axios");
const { SeriesType } = require("./typedefs");
const { Mutation } = require("./Mutation");
const Doc = require("./models/Doc");

const Query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    hello: {
      type: GraphQLString,
      resolve: () => "hello world"
    },
    db: {
      type: new GraphQLList(GraphQLString),
      resolve: async () => {
        const docs = await Doc.find({ test: "this is a string" })
          .limit(10)
          .execAsync();

        console.log(docs);
        return docs;
      }
    },
    search: {
      type: new GraphQLList(SeriesType),
      args: {
        type: {
          type: GraphQLString
        },
        keyword: {
          type: GraphQLString
        }
      },
      resolve: async (root, { keyword, type }, context) => {
        // defaults
        if (!type) {
          type = "anime";
        }

        return context.searchLoader.load({ type, keyword });
      }
    },
    anime: {
      type: SeriesType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: async (root, { id }, context) => {
        const type = "anime";
        return context.getSeriesLoader.load({ type, id });
      }
    },
    manga: {
      type: SeriesType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: async (root, { id }, context) => {
        const type = "manga";
        return context.getSeriesLoader.load({ type, id });
      }
    }
  })
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation
});
