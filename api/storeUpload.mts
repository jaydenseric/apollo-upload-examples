import { randomUUID } from "node:crypto";
import { createWriteStream, unlink } from "node:fs";
import type { FileUpload } from "graphql-upload/processRequest.mjs";

import UPLOAD_DIRECTORY_URL from "./constants/UPLOAD_DIRECTORY_URL.mts";

/**
 * Stores a GraphQL file upload in the filesystem.
 * @param upload Promised GraphQL file upload.
 * @returns Resolves the stored file name.
 */
export default async function storeUpload(
  upload: Promise<FileUpload>,
): Promise<string> {
  const { createReadStream, filename } = await upload;
  const stream = createReadStream();
  const storedFileName = `${randomUUID()}-${filename}`;
  const storedFileUrl = new URL(storedFileName, UPLOAD_DIRECTORY_URL);

  // Store the file in the filesystem.
  await new Promise<void>((resolve, reject) => {
    // Create a stream to which the upload will be written.
    const writeStream = createWriteStream(storedFileUrl);

    // When the upload is fully written, resolve the promise.
    writeStream.on("finish", resolve);

    // If there's an error writing the file, remove the partially written file
    // and reject the promise.
    writeStream.on("error", (error) => {
      unlink(storedFileUrl, () => {
        reject(error);
      });
    });

    // In Node.js <= v13, errors are not automatically propagated between piped
    // streams. If there is an error receiving the upload, destroy the write
    // stream with the corresponding error.
    stream.on("error", (error) => writeStream.destroy(error));

    // Pipe the upload into the write stream.
    stream.pipe(writeStream);
  });

  return storedFileName;
}
