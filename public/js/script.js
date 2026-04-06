// fetch transactions

function loadData() {
  fetch("/get")
    .then(res => res.json())
    .then(data => {

      const list = document.getElementById("list");
      list.innerHTML = "";

      for (let i = 0; i < data.length; i++) {
        const item = document.createElement("li");

        item.innerHTML =
          data[i].title + " - ₹" + data[i].amount +
          " (" + data[i].type + ")" +
          " <a href='/delete/" + data[i]._id + "'>Delete</a>";

        list.appendChild(item);
      }
    });
}

// fetch summary
function loadSummary() {
  fetch("/summary")
    .then(res => res.json())
    .then(data => {
      document.getElementById("income").innerText = data.totalIncome;
      document.getElementById("expense").innerText = data.totalExpense;
      document.getElementById("balance").innerText = data.balance;
    });
}

// load on start
loadData();
loadSummary();