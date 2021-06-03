if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.json());

// db connection
const db = require("./database/db");
db.then(() => {
  console.log("Database connection successful");
}).catch((err) => {
  console.log(err);
});

const indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
