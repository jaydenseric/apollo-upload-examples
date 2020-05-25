'use strict';

const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = require('graphql');

module.exports = new GraphQLObjectType({
  name: 'File',
  description: 'A stored file.',
  fields: () => ({
    id: {
      description: 'Unique ID.',
      type: GraphQLNonNull(GraphQLID),
    },
    path: {
      description: 'Where it’s stored in the filesystem.',
      type: GraphQLNonNull(GraphQLString),
    },
    filename: {
      description: 'Filename, including extension.',
      type: GraphQLNonNull(GraphQLString),
    },
    mimetype: {
      description: 'MIME type.',
      type: GraphQLNonNull(GraphQLString),
    },
  }),
});
