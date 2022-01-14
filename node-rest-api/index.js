let express = require("express"),
  path = require("path"),
  cors = require("cors"),
  bodyParser = require("body-parser");

require("dotenv").config({ path: "./environment.env" });
require("./database/db").connect();

const userRouter = require("./api/routes/user.routes");
const coockieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(coockieParser());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());


// API root
app.use("/api", userRouter);

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Listening on port " + port);
});

