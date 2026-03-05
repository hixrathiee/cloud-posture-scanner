const {
  ListBucketsCommand,
  GetBucketLocationCommand,
  GetBucketEncryptionCommand,
  GetPublicAccessBlockCommand
} = require("@aws-sdk/client-s3");

const { s3Client } = require("../config/awsConfig");

async function getBuckets() {
  const data = await s3Client.send(new ListBucketsCommand({}));

  const buckets = [];

  for (const bucket of data.Buckets) {
    const name = bucket.Name;

    let region = "unknown";
    let encryption = "Disabled";
    let publicAccess = "Public";

    try {
      const location = await s3Client.send(
        new GetBucketLocationCommand({ Bucket: name })
      );
      region = location.LocationConstraint || "us-east-1";
    } catch (err) {}

    try {
      await s3Client.send(
        new GetBucketEncryptionCommand({ Bucket: name })
      );
      encryption = "Enabled";
    } catch (err) {}

    try {
      const access = await s3Client.send(
        new GetPublicAccessBlockCommand({ Bucket: name })
      );

      if (access.PublicAccessBlockConfiguration.BlockPublicAcls) {
        publicAccess = "Private";
      }
    } catch (err) {}

    buckets.push({
      bucketName: name,
      region,
      encryption,
      publicAccess
    });
  }

  return buckets;
}

module.exports = { getBuckets };