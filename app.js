const express = require("express");
const routeLoader = require("./routes");
const cors = require("cors");
const app = express();

// Enable Cross Origin Resource Sharing to all origins by default
app.use(cors());

// Parses application/json
app.use(express.json());

// Parses urlencoded bodies
app.use(express.urlencoded({ extended: false }));

// Init application loaders
routeLoader(app);

// Error Handler Middleware
app.use((err, req, res, next) => {
  const { message, status } = err;

  res.status(status).send({ message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
