const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const { SeriesType } = require("./typedefs");
const db = require("./models/Doc");

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
        var doc = {
          hello: "world",
          n: 5,
          today: new Date(),
          nedbIsAwesome: true,
          notthere: null,
          notToBeSaved: undefined, // Will not be saved
          fruits: ["apple", "orange", "pear"],
          infos: { name: "nedb" }
        };

        await db.insert(doc);

        const foundDoc = await db.findOne({ n: 5 });
        console.log(foundDoc);
        return foundDoc.hello;
      }
    }
  })
});
