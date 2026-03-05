const express = require("express");
const router = express.Router();

const { getBucket } = require("../controllers/s3Controller");

router.get("/buckets",getBucket);

module.exports = router;