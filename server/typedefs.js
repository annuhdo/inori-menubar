const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");
const { parseImage, parseURL } = require("./utils");

exports.SeriesInputType = {
  id: {
    type: new GraphQLNonNull(GraphQLString)
  },
  type: {
    type: GraphQLString
  },
  title: {
    type: GraphQLString
  },
  jp_title: {
    type: GraphQLString
  },
  url: {
    type: GraphQLString
  },
  image_url: {
    type: GraphQLString
  },
  synopsis: {
    type: GraphQLString
  },
  startDate: {
    type: GraphQLString
  },
  endDate: {
    type: GraphQLString
  },
  ageRating: {
    type: GraphQLString
  },
  subType: {
    type: GraphQLString
  },
  status: {
    type: GraphQLString
  },
  episodes: {
    type: GraphQLInt
  },
  youtubeVideoId: {
    type: GraphQLString
  },
  userStatus: {
    type: new GraphQLNonNull(GraphQLString)
  },
  watchedEps: {
    type: GraphQLInt
  }
};

exports.SeriesOutputType = new GraphQLObjectType({
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
        return (
          (root.attributes && root.attributes.canonicalTitle) || root.title
        );
      }
    },
    jp_title: {
      type: GraphQLString,
      resolve: root =>
        (root.attributes && root.attributes.titles.ja_jp) || root.jp_title
    },
    url: {
      type: GraphQLString,
      resolve: root =>
        (root.attributes && parseURL(root.type, root.attributes.slug)) ||
        root.url
    },
    image_url: {
      type: GraphQLString,
      resolve: root =>
        (root.attributes &&
          root.attributes.posterImage &&
          root.attributes.posterImage.medium) ||
        root.image_url
    },
    synopsis: {
      type: GraphQLString,
      resolve: root =>
        (root.attributes && root.attributes.synopsis) || root.synopsis
    },
    startDate: {
      type: GraphQLString,
      resolve: root =>
        (root.attributes && root.attributes.startDate) || root.startDate
    },
    endDate: {
      type: GraphQLString,
      resolve: root =>
        (root.attributes && root.attributes.endDate) || root.endDate
    },
    ageRating: {
      type: GraphQLString,
      resolve: root =>
        (root.attributes && root.attributes.ageRatingGuide) || root.ageRating
    },
    subtype: {
      type: GraphQLString,
      resolve: root =>
        (root.attributes && root.attributes.subtype) || root.subtype
    },
    status: {
      type: GraphQLString,
      resolve: root =>
        (root.attributes && root.attributes.status) || root.status
    },
    episodes: {
      type: GraphQLInt,
      resolve: root =>
        (root.attributes && root.attributes.episodeCount) || root.episodes
    },
    youtubeVideoId: {
      type: GraphQLString,
      resolve: root =>
        (root.attributes && root.attributes.youtubeVideoId) ||
        root.youtubeVideoId
    }
  })
});
