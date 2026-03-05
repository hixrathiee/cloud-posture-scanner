const express = require("express");
const cors = require("cors");
require("dotenv").config();

const ec2Routes = require("./routes/ec2Routes");
const s3Routes = require("./routes/s3Routes");
const cisRoutes = require("./routes/cisRoutes");

const app = express();
app.use(cors());

app.use("/api", ec2Routes);
app.use("/api", s3Routes);
app.use("/api", cisRoutes);

app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
});