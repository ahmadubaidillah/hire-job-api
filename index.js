const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pekerjaRouter = require("./src/router/pekerjaRouter");
const perekrutRouter = require("./src/router/perekrutRouter");
const app = express();
const helmet = require("helmet");

const port = 4000;

app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());
app.use(pekerjaRouter);
app.use(perekrutRouter);

app.listen(port, () => console.log(`serve on port: ${port}`));
