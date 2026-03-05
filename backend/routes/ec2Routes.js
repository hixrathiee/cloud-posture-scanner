const express = require("express");
const router = express.Router();

const { getInstances } = require("../controllers/ec2Controller");

router.get('/instances',getInstances);

module.exports = router;