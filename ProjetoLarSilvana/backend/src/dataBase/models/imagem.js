const mongoose = require("mongoose");
const { S3 } = require('@aws-sdk/client-s3');
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const s3 = new S3({
  accessKeyId: "AKIAS5AJ4KLGYFN6J6PP",
  secretAccessKey: "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",
  region: "us-east-1"
});

const ImagemSchema = new mongoose.Schema({
  name: String,
  size: Number,
  key: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ImagemSchema.pre("save", function() {
  if (!this.url) {
    //this.url = `${process.env.APP_URL}/files/${this.key}`;
    this.url = `${'http://localhost:3003'}/files/${this.key}`;
  }
});

ImagemSchema.pre("remove", function() {
  //if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        //Bucket: process.env.BUCKET_NAME,
        Bucket: "uploadlarsilvana",
        Key: this.key
      })
      .promise()
      .then(response => {
        console.log(response.status);
      })
      .catch(response => {
        console.log(response.status);
      });
  /*} else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "uploads", this.key)
    );
  }*/
});

module.exports = mongoose.model("Imagem", ImagemSchema);