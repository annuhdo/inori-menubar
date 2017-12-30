const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const { parseImage, parseURL } = require("./utils");

const SeriesType = new GraphQLObjectType({
  name: "Series",
  fields: () => ({
    id: {
      type: GraphQLString,
      resolve: root => {
        return root.id;
      }
    },
    type: {
      type: GraphQLString,
      resolve: root => {
        return root.type;
      }
    },
    title: {
      type: GraphQLString,
      resolve: root => {
        return root.attributes.canonicalTitle;
      }
    },
    jp_title: {
      type: GraphQLString,
      resolve: root => root.attributes.titles.ja_jp
    },
    url: {
      type: GraphQLString,
      resolve: root => parseURL(root.type, root.attributes.slug)
    },
    image_url: {
      type: GraphQLString,
      resolve: root => root.attributes.posterImage.medium
    },
    synopsis: {
      type: GraphQLString,
      resolve: root => root.attributes.synopsis
    },
    startDate: {
      type: GraphQLString,
      resolve: root => root.attributes.startDate
    },
    endDate: {
      type: GraphQLString,
      resolve: root => root.attributes.endDate
    },
    ageRating: {
      type: GraphQLString,
      resolve: root => root.attributes.ageRatingGuide
    },
    subtype: {
      type: GraphQLString,
      resolve: root => root.attributes.subtype
    },
    status: {
      type: GraphQLString,
      resolve: root => root.attributes.status
    },
    episodes: {
      type: GraphQLInt,
      resolve: root => root.attributes.episodeCount
    },
    youtubeVideoId: {
      type: GraphQLString,
      resolve: root => root.attributes.youtubeVideoId
    }
  })
});

module.exports = {
  SeriesType
};
