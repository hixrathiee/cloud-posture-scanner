const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { s3Client } = require("../config/awsConfig");

const BUCKET_NAME = "cloud-scanner-results-anjali";

async function saveResultsToS3(results) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: "scan-results.json",
    Body: JSON.stringify(results, null, 2),
    ContentType: "application/json"
  };

  await s3Client.send(new PutObjectCommand(params));
}

module.exports = { saveResultsToS3 };