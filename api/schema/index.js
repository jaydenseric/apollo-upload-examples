'use strict';

const { GraphQLSchema } = require('graphql');
const MutationType = require('./MutationType');
const QueryType = require('./QueryType');

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
