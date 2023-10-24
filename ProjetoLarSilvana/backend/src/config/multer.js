const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const multerS3 = require("multer-s3");
const { S3 } = require('@aws-sdk/client-s3');

const s3 = new S3({
  accessKeyId: "AKIAS5AJ4KLGYFN6J6PP",
  secretAccessKey: "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",
  region: "us-east-1"
}); // Create an instance of S3

//const bucketName = process.env.BUCKET_NAME;
//const bucketName = 'uploadlarsilvana';

const storageTypes = {
  /*local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  }),*/
  s3: multerS3({
    s3: s3, // Use the S3 instance
    //bucket: bucketName,
    bucket: "uploadlarsilvana",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    }
  })
};

module.exports = {
  //dest: path.resolve(__dirname, "..", "..", "uploads"),
  //storage: storageTypes[process.env.STORAGE_TYPE],
  storage: storageTypes["s3"],
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "image/jpeg",
      "image/pjpeg",
      "image/png",
      "image/gif"
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};