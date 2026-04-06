// main server file

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// connect mongodb
mongoose.connect("mongodb+srv://chaitanya07_07:chaitanya123@cluster0.ydqjanx.mongodb.net/expenseDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// model
const Transaction = require("./models/Transaction");

// home page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// add transaction
app.post("/add", async (req, res) => {
  const data = req.body;

  const newTransaction = new Transaction({
    title: data.title,
    amount: data.amount,
    type: data.type,
    category: data.category,
    date: data.date
  });

  await newTransaction.save();

  res.redirect("/");
});

// get all transactions
app.get("/get", async (req, res) => {
  const data = await Transaction.find();
  res.json(data);
});

// delete transaction
app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  await Transaction.findByIdAndDelete(id);

  res.redirect("/");
});

// summary
app.get("/summary", async (req, res) => {
  const transactions = await Transaction.find();

  let income = 0;
  let expense = 0;

  for (let i = 0; i < data.length; i++) {
  const item = document.createElement("li");

  let colorClass = data[i].type === "income" ? "income" : "expense";

  item.innerHTML =
    "<span class='" + colorClass + "'>" +
    data[i].title + " - ₹" + data[i].amount +
    " (" + data[i].category + ")" +
    "</span>" +
    "<a class='delete-btn' href='/delete/" + data[i]._id + "'>Delete</a>";

  list.appendChild(item);
}

  const balance = income - expense;

  res.json({
    totalIncome: income,
    totalExpense: expense,
    balance: balance
  });
});

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
