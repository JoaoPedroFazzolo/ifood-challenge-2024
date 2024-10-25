import { createSalesChart } from "./graficos/salesChart.js";
import { createValueSalesChart } from "./graficos/valueSalesChart.js";
import { creatNewClient } from "./graficos/newClient.js";
import { creatAverageConsumption } from "./graficos/averageConsumption.js";
import { createExpensesChart, updateExpensesChart } from "./graficos/expensesChart.js";
import { createHorizontalBarChart, updateHorizontalChart } from "./graficos/horizontalBarChart.js";

const salesCtx = document.getElementById("salesChart").getContext("2d");
const valueSalesCtx = document.getElementById("valueSalesChart").getContext("2d");
const newClientCtx = document.getElementById("newClientChart").getContext("2d");
const averageConsumptionCtx = document.getElementById("averageConsumptionChart").getContext("2d");
const expensesCtx = document.getElementById("expensesChart").getContext("2d");
const horizontalCtx = document.getElementById("horizontalBarChart").getContext("2d");


const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");

const salesChart = createSalesChart(salesCtx);
const valueSalesChart = createValueSalesChart(valueSalesCtx);
const newClientChart = creatNewClient(newClientCtx);
const averageConsumptionChart = creatAverageConsumption(averageConsumptionCtx);
const expensesChart = createExpensesChart(expensesCtx);
const horizontalBarChart = createHorizontalBarChart(horizontalCtx);

function hideAllCharts() {
  document.getElementById("salesChart").style.display = "none";
  document.getElementById("valueSalesChart").style.display = "none";
  document.getElementById("newClientChart").style.display = "none";
  document.getElementById("averageConsumptionChart").style.display = "none";
}

document.querySelectorAll('input[name="btnradio"]').forEach((radio) => {
  radio.addEventListener('change', function () {
    hideAllCharts();
    if (this.id === 'btnradio1') {
      document.getElementById("salesChart").style.display = "block";
      salesChart.update();
    } else if (this.id === 'btnradio2') {
      document.getElementById("valueSalesChart").style.display = "block";
      valueSalesChart.update();
    } else if (this.id === 'btnradio3') {
      document.getElementById("newClientChart").style.display = "block";
      newClientChart.update();
    } else if (this.id === 'btnradio4') {
      document.getElementById("averageConsumptionChart").style.display = "block";
      averageConsumptionChart.update();
    }
  });
});




const checkboxesExpenses = {
  carne: document.getElementById("checkboxCarne"),
  bacon: document.getElementById("checkboxBacon"),
  pao: document.getElementById("checkboxPao"),
  leite: document.getElementById("checkboxLeite"),
  outros: document.getElementById("checkboxOutros"),
};

const checkboxesHorizontal = {
  xBurguer: document.getElementById("checkboxXBurguer"),
  xBacon2: document.getElementById("checkboxXBacon2"),
  xBaconEgg: document.getElementById("checkboxXBaconEgg"),
  xTudo: document.getElementById("checkboxXTudo"),
  outros2: document.getElementById("checkboxOutros2"),
};

const updateCharts = () => {
  updateExpensesChart(expensesChart, checkboxesExpenses);
  updateHorizontalChart(horizontalBarChart, checkboxesHorizontal);
};


const registerCheckboxEvents = (checkboxes, updateFunction) => {
  Object.values(checkboxes).forEach((checkbox) => {
    checkbox.addEventListener("change", updateFunction);
  });
};

registerCheckboxEvents(checkboxesExpenses, updateCharts);
registerCheckboxEvents(checkboxesHorizontal, updateCharts);

window.addEventListener("resize", function () {
  salesChart.resize();
  valueSalesChart.resize();
  newClientChart.resize();
  averageConsumptionChart.resize();
  expensesChart.resize();
  horizontalBarChart.resize();
});

myModal.addEventListener("shown.bs.modal", () => {
  myInput.focus();
});