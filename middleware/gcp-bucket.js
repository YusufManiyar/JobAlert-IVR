const { Storage } = require('@google-cloud/storage');
const { pipeline }  = require('stream/promises')
const { Readable }  = require('stream')

const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    keyFilename: process.env.GCP_KEY_FILENAME,
  });
  const bucketName = 'contact-file-url';
  const bucket = storage.bucket(bucketName);

  module.exports = { 
    fileURL: async (file) => {
            const fileName = `${Date.now()}-${file.originalname}`;  // Create a unique file name
            const blob = bucket.file(fileName);
            
            const readStream = new Readable()
            readStream.push(fileName)
            readStream.push(null)
      
            // Create a stream to upload the file
            const blobStream = blob.createWriteStream({
            resumable: false,
            contentType: file.mimetype,
            gzip: true,
            // By setting the option `destination`, you can change the name of the
            // object you are uploading to a bucket.
            metadata: {
              cacheControl: 'public, max-age=31536000',
            },
            });

            try {
                await pipeline([readStream, blobStream])
                return `https://storage.googleapis.com/${bucketName}/${fileName}`
            }
            catch(error) {
                console.log("🚀 ~ fileURL: ~ error:", error)
                throw 'Error uploading file'
            }
            // blobStream.on('error', (err) => {
            // console.error('Error uploading to GCS:', err);
            // throw 'Error uploading file'
            // });

            // return 
        }
    }