const { getBuckets } = require("../services/s3Service");

exports.getBucket =  async (req, res) => {
  try {
    const buckets = await getBuckets();
    res.json(buckets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}