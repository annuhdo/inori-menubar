const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const { SeriesType } = require("./typedefs");
const Doc = require("./models/Doc");

exports.Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addSeries: {
      type: GraphQLString,
      // args: {
      //   name: {
      //     type: GraphQLString
      //   }
      // },
      resolve: async (root, args, context) => {
        // Construct a single document and then save it
        var doc = new Doc({ a: 5, now: new Date(), test: "this is a string" });
        doc.b = 13; // you can modify the doc
        await doc.save();
        return doc._id;
      }
    }
  })
});
