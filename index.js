const express = require("express");
const app = express();
const env = require("./config/envConfig");
const cors = require("cors");
const connect = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

//Database Connection
connect();

app.use(express.json());
app.use(cors());

//User Routes
app.use("/api", userRoutes);

//Category Routes
app.use("/api", categoryRoutes);

//Product Routes
app.use("/api", productRoutes);

const port = env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
