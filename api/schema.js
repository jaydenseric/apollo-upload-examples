'use strict';

const { GraphQLSchema } = require('graphql');
const { MutationType } = require('./types/Mutation');
const { QueryType } = require('./types/Query');

exports.schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
