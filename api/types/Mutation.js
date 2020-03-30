'use strict';

const { GraphQLUpload } = require('apollo-server-koa');
const { GraphQLList, GraphQLObjectType, GraphQLNonNull } = require('graphql');
const promisesAll = require('promises-all');
const { FileType } = require('./File');

exports.MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    singleUpload: {
      description: 'Stores a single file.',
      type: GraphQLNonNull(FileType),
      args: {
        file: {
          description: 'File to store.',
          type: GraphQLNonNull(GraphQLUpload),
        },
      },
      resolve: (parent, { file }, { storeUpload }) => storeUpload(file),
    },
    multipleUpload: {
      description: 'Stores multiple files.',
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(FileType))),
      args: {
        files: {
          description: 'Files to store.',
          type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLUpload))),
        },
      },
      async resolve(parent, { files }, { storeUpload }) {
        const { resolve, reject } = await promisesAll.all(
          files.map(storeUpload)
        );

        if (reject.length)
          reject.forEach(({ name, message }) =>
            console.error(`${name}: ${message}`)
          );

        return resolve;
      },
    },
  }),
});
