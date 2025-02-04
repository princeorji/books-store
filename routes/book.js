const express = require("express");
const Book = require("../models/Book");

const app = express();

app.get("/", async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const { count: total, rows: books } = await Book.findAndCountAll({
    offset,
    limit,
  });
  res.status(200).json({ books, page, limit, total });
});

app.get("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    console.log("ERROR", error);
    next(error);
  }
});

app.post("/", async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    console.log("ERROR", error);
    next(error);
  }
});

app.patch("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.update(req.body);
    res.status(200).json(book);
  } catch (error) {
    console.log("ERROR", error);
    next(error);
  }
});

app.delete("/:id", async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.destroy();
    res.status(200).json(book);
  } catch (error) {
    console.log("ERROR", error);
    next(error);
  }
});

module.exports = app;
