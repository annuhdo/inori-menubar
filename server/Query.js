const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const { SeriesOutputType } = require("./typedefs");
const { SeriesInputType } = require("./typedefs");
const db = require("./models/Series");

exports.Query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    getWatchingList: {
      type: new GraphQLList(SeriesOutputType),
      resolve: async () => {
        return await db.find({ userStatus: "watching" });
      }
    },
    getCompletedList: {
      type: new GraphQLList(SeriesOutputType),
      resolve: async () => {
        return await db.find({ userStatus: "completed" });
      }
    },
    getDroppedList: {
      type: new GraphQLList(SeriesOutputType),
      resolve: async () => {
        return await db.find({ userStatus: "dropped" });
      }
    },
    getSavedData: {
      type: new GraphQLList(SeriesOutputType),
      args: {
        type: {
          type: GraphQLString
        }
      },
      resolve: async (root, { type }, context) => {
        if (!type) {
          return await db.find({});
        } else {
          return await db.find({ type });
        }
      }
    },
    search: {
      type: new GraphQLList(SeriesOutputType),
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
      type: SeriesOutputType,
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
      type: SeriesOutputType,
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
