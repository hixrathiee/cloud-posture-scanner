const { DescribeTrailsCommand } = require("@aws-sdk/client-cloudtrail");
const { cloudTrailClient } = require("../config/awsConfig");

async function isCloudTrailEnabled() {
  const data = await cloudTrailClient.send(new DescribeTrailsCommand({}));

  return data.trailList.length > 0;
}

module.exports = { isCloudTrailEnabled };