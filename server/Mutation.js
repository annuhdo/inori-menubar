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
      resolve: async (root, series) => {
        try {
          const alreadyExist = await db.findOne({ id: series.id });
          let insertion = null;
          if (alreadyExist) {
            // Update the doc
            insertion = await db.update(
              { id: series.id },
              { $set: series },
              {}
            );
          } else {
            insertion = await db.insert(series);
          }
          return series.id;
        } catch (err) {
          throw new Error(err);
        }
      }
    },
    removeSeries: {
      type: GraphQLString,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve: async (root, { id }) => {
        try {
          await db.update({ id }, { $set: { userStatus: null } }, {});
          const removedDoc = await db.remove({ id }, {});
          return removedDoc;
        } catch (err) {
          throw new Error(err);
        }
      }
    },
    updateSeries: {
      type: GraphQLString,
      args: SeriesInputType,
      resolve: async (root, args) => {
        const alreadyExist = await db.findOne({ id: args.id });

        if (!alreadyExist) {
          throw new Error("Unable to find the series to update.");
        }

        if (
          alreadyExist.episodes &&
          (args.watchedEps < alreadyExist.episodes ||
            args.watchedEps > alreadyExist.episodes)
        ) {
          args.watchedEps = Math.max(args.watchedEps, 1);
          args.watchedEps = Math.min(args.watchedEps, alreadyExist.episodes);
        }

        try {
          const update = await db.update({ id: args.id }, { $set: args }, {});
          return update;
        } catch (err) {
          throw new Error(err);
        }
      }
    }
  })
});
