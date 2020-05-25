'use strict';

const { GraphQLList, GraphQLObjectType, GraphQLNonNull } = require('graphql');
const FileType = require('./FileType');

module.exports = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    uploads: {
      description: 'All stored files.',
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(FileType))),
      resolve: (source, args, { db }) => db.get('uploads').value(),
    },
  }),
});
