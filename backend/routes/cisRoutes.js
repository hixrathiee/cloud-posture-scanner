const express = require("express");
const router = express.Router();

const { getCISChecks } = require("../controllers/cisController");

router.get("/cis-results", getCISChecks);

module.exports = router;