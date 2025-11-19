const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const filterCategory = document.getElementById("filterCategory");
const filterMonth = document.getElementById("filterMonth");
const expenseList = document.getElementById("expenseList");
const totalBox = document.getElementById("totalBox");
const chartCanvas = document.getElementById("chartCanvas");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;

function addExpense() {
  const title = titleInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;
  const date = new Date().toISOString();

  if (!title || isNaN(amount) || amount <= 0) return;

  expenses.push({ title, amount, category, date });
  save();
  render();

  titleInput.value = "";
  amountInput.value = "";
}

function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function render() {
  expenseList.innerHTML = "";
  const filtered = expenses.filter((e) => {
    const categoryMath =
      filterCategory.value === "all" || e.category === filterCategory.value;
    const monthMath =
      filterMonth.value === "all" ||
      new Date(e.date).getMonth() == filterMonth.value;
    return categoryMath && monthMath;
  });

  filtered.forEach((exp, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <span>${exp.title} — $${exp.amount} (${exp.category}) — ${exp.date.split("T")[0]}</span>
        <button id="btnDelete" onclick="removeExp(${index})">Delete</button>
        `;
    expenseList.appendChild(li);
  });

  calcTotal(filtered);
  updateChart();
}

function calcTotal(filtered) {
  const total = filtered.reduce((sum, e) => sum + e.amount, 0);
  totalBox.textContent = `Total: $${total}`;
}

function removeExp(index) {
    expenses.splice(index, 1);
    save();
    render();
}

function updateChart() {
  const monthlyTotals = new Array(12).fill(0);

  expenses.forEach((e) => {
    const month = new Date(e.date).getMonth();
    monthlyTotals[month] += e.amount;
  });

  if (chart) chart.destroy();

  chart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [{ label: "Expenses", data: monthlyTotals }],
    },
  });
}

document.getElementById("addBtn").addEventListener("click", addExpense);
filterCategory.addEventListener("change", render);
filterMonth.addEventListener("change", render);

render();