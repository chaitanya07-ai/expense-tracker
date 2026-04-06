const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://chaitanya07_07:5REj87LUA69yFaa7@cluster0.ydqjanx.mongodb.net/expenseDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const Transaction = require("./models/Transaction");

// home
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});

// add
app.post("/add", async (req, res) => {
  const t = new Transaction(req.body);
  await t.save();
  res.redirect("/");
});

// get all
app.get("/get", async (req, res) => {
  const data = await Transaction.find();
  res.json(data);
});

// delete
app.get("/delete/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

// summary
app.get("/summary", async (req, res) => {
  const data = await Transaction.find();

  let income = 0;
  let expense = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i].type === "income") income += data[i].amount;
    else expense += data[i].amount;
  }

  res.json({
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running");
});
