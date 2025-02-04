const books = require("./book");

module.exports = (app) => {
  app.use("/books", books);
};
