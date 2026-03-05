const { runCISChecks } = require("../services/cisChecks");
const { saveResultsToS3 } = require("../services/storageService");

exports.getCISChecks = async (req, res) => {
  try {
    const results = await runCISChecks();
    await saveResultsToS3(results);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}