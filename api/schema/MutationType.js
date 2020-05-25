'use strict';

const { GraphQLUpload } = require('apollo-server-koa');
const { GraphQLList, GraphQLObjectType, GraphQLNonNull } = require('graphql');
const FileType = require('./FileType');

module.exports = new GraphQLObjectType({
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
        // Ensure an error storing one upload doesn’t prevent storing the rest.
        const results = await Promise.allSettled(files.map(storeUpload));
        return results.reduce((storedFiles, { value, reason }) => {
          if (value) storedFiles.push(value);
          // Realistically you would do more than just log an error.
          else console.error(`Failed to store upload: ${reason}`);
          return storedFiles;
        }, []);
      },
    },
  }),
});
