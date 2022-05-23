// @ts-check

import { GraphQLSchema } from "graphql";

import MutationType from "./MutationType.mjs";
import QueryType from "./QueryType.mjs";

export default new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
