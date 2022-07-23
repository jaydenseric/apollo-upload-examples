// @ts-check

import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from "graphql";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";

import storeUpload from "../storeUpload.mjs";
import FileType from "./FileType.mjs";

export default new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    singleUpload: {
      description: "Stores a single file.",
      type: new GraphQLNonNull(FileType),
      args: {
        file: {
          description: "File to store.",
          type: new GraphQLNonNull(GraphQLUpload),
        },
      },
      resolve: (parent, { file }) => storeUpload(file),
    },
    multipleUpload: {
      description: "Stores multiple files.",
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(FileType))),
      args: {
        files: {
          description: "Files to store.",
          type: new GraphQLNonNull(
            new GraphQLList(new GraphQLNonNull(GraphQLUpload))
          ),
        },
      },
      async resolve(
        parent,
        /**
         * @type {{ files: Array<
         *   Promise<import("graphql-upload/processRequest.mjs").FileUpload>
         * >}}
         */
        { files }
      ) {
        /** @type {Array<string>} */
        const storedFileNames = [];

        // Ensure an error storing one upload doesn’t prevent storing the rest.
        for (const result of await Promise.allSettled(files.map(storeUpload)))
          if ("value" in result) storedFileNames.push(result.value);
          // Realistically you would do more than just log an error.
          else console.error(`Failed to store upload: ${result.reason}`);

        return storedFileNames;
      },
    },
  }),
});
