const {
  DescribeInstancesCommand,
  DescribeSecurityGroupsCommand
} = require("@aws-sdk/client-ec2");

const { ec2Client } = require("../config/awsConfig");

async function getEC2Instances() {
  const command = new DescribeInstancesCommand({});
  const data = await ec2Client.send(command);

  const instances = [];

  data.Reservations.forEach(res => {
    res.Instances.forEach(instance => {
      instances.push({
        instanceId: instance.InstanceId,
        instanceType: instance.InstanceType,
        publicIp: instance.PublicIpAddress || null,
        securityGroups: instance.SecurityGroups.map(sg => sg.GroupName)
      });
    });
  });

  return instances;
}

async function getSecurityGroups() {
  const command = new DescribeSecurityGroupsCommand({});
  const data = await ec2Client.send(command);

  return data.SecurityGroups;
}

module.exports = {
  getEC2Instances,
  getSecurityGroups
};