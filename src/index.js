const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const port = process.env.PORT || 3001;
const mongo_db = process.env.MONGO_DB;
const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);
mongoose.connect(mongo_db);

app.listen(port, () => {
  console.log("Server is running in port: ", port);
});
