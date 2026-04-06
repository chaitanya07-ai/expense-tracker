// load data
function loadData() {
  fetch("/get")
    .then(res => res.json())
    .then(data => {

      const list = document.getElementById("list");
      list.innerHTML = "";

      let income = 0;
      let expense = 0;
      let category = {};

      for (let i = 0; i < data.length; i++) {

        let t = data[i];

        if (t.type === "income") income += t.amount;
        else expense += t.amount;

        if (!category[t.category]) category[t.category] = 0;
        category[t.category] += t.amount;

        let li = document.createElement("li");

        li.innerHTML =
          "<b>" + t.title + "</b> <span style='float:right'>₹" + t.amount + "</span>" +
          "<br><small>" + t.category + " • " + new Date(t.date).toDateString() + "</small>" +
          "<br><a class='delete' href='/delete/" + t._id + "'>Delete</a>";

        list.appendChild(li);
      }

      document.getElementById("income").innerText = income;
      document.getElementById("expense").innerText = expense;
      document.getElementById("balance").innerText = income - expense;

      loadCharts(category, income, expense);
    });
}

// charts
function loadCharts(category, income, expense) {

  new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: Object.keys(category),
      datasets: [{
        data: Object.values(category),
        backgroundColor: [
          "#ff6384", "#36a2eb", "#ffcd56",
          "#4bc0c0", "#9966ff", "#ff9f40"
        ]
      }]
    },
    options: {
      responsive: true
    }
  });

  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: ["Income", "Expense"],
      datasets: [{
        data: [income, expense],
        backgroundColor: ["green", "red"]
      }]
    },
    options: {
      responsive: true
    }
  });
}

// search
function searchData() {
  let input = document.getElementById("search").value.toLowerCase();
  let items = document.querySelectorAll("#list li");

  for (let i = 0; i < items.length; i++) {
    let text = items[i].innerText.toLowerCase();
    items[i].style.display = text.includes(input) ? "" : "none";
  }
}

function loadTimeline(data) {
  const timeline = document.getElementById("timeline");
  timeline.innerHTML = "";

  for (let i = data.length - 1; i >= 0; i--) {
    let t = data[i];

    let div = document.createElement("div");
    div.className = "timeline-item";

    div.innerHTML =
      "<b>" + t.title + "</b> ₹" + t.amount +
      "<br><span>" + new Date(t.date).toDateString() + "</span>";

    timeline.appendChild(div);
  }
}

// start
loadData();
loadTimeline(data);
