const { EC2Client } = require("@aws-sdk/client-ec2");
const { S3Client } = require("@aws-sdk/client-s3");
const { CloudTrailClient } = require("@aws-sdk/client-cloudtrail");
const { IAMClient } = require("@aws-sdk/client-iam");

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};

const ec2Client = new EC2Client({
  region: process.env.AWS_REGION,
  credentials,
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials,
});

const cloudTrailClient = new CloudTrailClient({
  region: process.env.AWS_REGION,
  credentials,
});

const iamClient = new IAMClient({
  region: process.env.AWS_REGION,
  credentials,
});

module.exports = {
  ec2Client,
  s3Client,
  cloudTrailClient,
  iamClient
};