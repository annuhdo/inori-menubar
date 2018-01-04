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

exports.Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addSeries: {
      type: GraphQLString,
      args: SeriesInputType,
      resolve: async (root, series, context) => {
        try {
          await db.insert(series);

          // const foundDoc = await db.findOne({ id: "886" });
          // console.log(foundDoc);
          return foundDoc.title;
        } catch (err) {
          console.error(err);
        }
      }
    },
    changeStatus: {
      type: GraphQLString,
      args: {
        _id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        newStatus: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (root, { _id, newStatus }) => {
        if (
          newStatus != "watching" ||
          newStatus != "completed" ||
          newStatus != dropped
        ) {
          throw new Error();
        }
        try {
          await db.update({ _id }, { $set: { userStatus: newStatus } });
        } catch (err) {
          console.error(err);
        }
      }
    }

    // TODO: test this
  })
});
