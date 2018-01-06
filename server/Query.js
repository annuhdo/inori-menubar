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
    exist: {
      type: GraphQLInt,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: async (root, { id }) => {
        try {
          const foundDoc = await db.find({ id });
          return foundDoc.length;
        } catch (err) {
          throw new Error(err);
        }
      }
    },
    seriesList: {
      type: new GraphQLList(SeriesOutputType),
      args: {
        userStatus: {
          type: GraphQLInt
        }
      },
      resolve: async (root, { userStatus }) => {
        if (userStatus < 1 || userStatus > 3) {
          throw new Error(
            `Invalid status code: ${userStatus}. Valid status code is between 1 and 3.`
          );
        }
        try {
          return await db.find({ userStatus });
        } catch (err) {
          throw new Error(err);
        }
      }
    },
    savedData: {
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
