const { getEC2Instances } = require("../services/ec2Service");

exports.getInstances =  async (req,res)=>{
   try {
    const instances = await getEC2Instances();
    res.json(instances)
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
};
