const {GetAccountSummaryCommand} = require("@aws-sdk/client-iam");

const { iamClient } = require("../config/awsConfig");

async function isRootMFAEnabled() {
  const data = await iamClient.send(new GetAccountSummaryCommand({}));

  return data.SummaryMap.AccountMFAEnabled === 1;
}

module.exports = { isRootMFAEnabled };