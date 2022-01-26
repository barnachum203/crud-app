let express = require("express"),
  path = require("path"),
  cors = require("cors"),
  bodyParser = require("body-parser");

require("dotenv").config({ path: "./environment.env" });
require("./db").connect();

const userRouter = require("./routes/user.routes");
const petRouter = require("./routes/pet.routes");
const { string } = require("joi");

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());

// API root
app.use("/api", userRouter);
app.use("/api/pets", petRouter);

// PORT
// const port: number = Number(process.env.PORT) || 8000;
const port = process.env.PORT || "8000";

app.listen(port, () => {
  console.log("Listening on port " + port);
});
