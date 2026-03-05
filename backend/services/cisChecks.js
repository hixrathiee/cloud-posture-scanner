const { getBuckets } = require("./s3Service");
const { getSecurityGroups } = require("./ec2Service");
const { isCloudTrailEnabled } = require("./cloudTrailService");
const { isRootMFAEnabled } = require("./iamService");

async function runCISChecks() {

  const results = [];
  const buckets = await getBuckets();

  // S3 checks
  for (const bucket of buckets) {

    results.push({
      check: "S3 bucket public access",
      resource: bucket.bucketName,
      status: bucket.publicAccess === "Private" ? "PASS" : "FAIL",
       evidence: `Public access: ${bucket.publicAccess}`
    });

    results.push({
      check: "S3 encryption enabled",
      resource: bucket.bucketName,
      status: bucket.encryption === "Enabled" ? "PASS" : "FAIL",
      evidence: `Encryption status: ${bucket.encryption}`
    });

  }

  // MFA check
  const rootMFA = await isRootMFAEnabled();

  results.push({
    check: "Root account MFA enabled",
    resource: "AWS Account",
    status: rootMFA ? "PASS" : "FAIL",
     evidence: rootMFA
    ? "Root account has MFA enabled"
    : "Root account MFA is not enabled"
  });

   // CloudTrail check
  const cloudtrailEnabled = await isCloudTrailEnabled();

  results.push({
    check: "CloudTrail enabled",
    resource: "AWS Account",
    status: cloudtrailEnabled ? "PASS" : "FAIL",
    evidence: cloudtrailEnabled
    ? "CloudTrail trail detected"
    : "No CloudTrail trail found"
  });

  // Security group check
  const securityGroups = await getSecurityGroups();

  for (const sg of securityGroups) {

    sg.IpPermissions.forEach(permission => {

      if (permission.FromPort === 22) {

        permission.IpRanges.forEach(range => {
          results.push({
            check: "Security group open to SSH (0.0.0.0/0)",
            resource: sg.GroupId,
            status: range.CidrIp === "0.0.0.0/0" ? "FAIL" : "PASS",
            evidence: `Port 22 access from ${range.CidrIp}`
          });
        });
      }
    });
  }

  return results;
}

module.exports = { runCISChecks };