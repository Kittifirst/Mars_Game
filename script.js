const light = document.getElementById("light");
const co2 = document.getElementById("co2");
const water = document.getElementById("water");

const lightVal = document.getElementById("lightVal");
const co2Val = document.getElementById("co2Val");
const waterVal = document.getElementById("waterVal");

light.oninput = () => lightVal.textContent = light.value;
co2.oninput = () => co2Val.textContent = co2.value;
water.oninput = () => waterVal.textContent = water.value;

let chart;

function runSimulation() {

  const L = parseInt(light.value);
  const C = parseInt(co2.value);
  const W = parseInt(water.value);

  const rate = Math.min(L, C, W);
  const efficiency = rate;
  const oxygen = (rate * 0.5).toFixed(1);

  document.getElementById("efficiency").innerText =
      "Efficiency: " + efficiency + " %";

  document.getElementById("oxygen").innerText =
      "O₂ Production: " + oxygen + " bubbles/min";

  let limiting = "";
  if(rate === L) limiting = "Light is limiting factor.";
  if(rate === C) limiting = "CO₂ is limiting factor.";
  if(rate === W) limiting = "Water is limiting factor.";

  document.getElementById("analysis").innerText = limiting;

  updateChart(L, C, W);
}

function updateChart(L, C, W) {

  const ctx = document.getElementById("myChart").getContext("2d");

  if(chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Light', 'CO₂', 'Water'],
      datasets: [{
        label: 'Input Levels',
        data: [L, C, W]
      }]
    }
  });
}

document.querySelectorAll("input[type=range]").forEach(slider => {
  slider.addEventListener("touchstart", function(e) {
    e.stopPropagation();
  }, { passive: false });

  slider.addEventListener("touchmove", function(e) {
    e.stopPropagation();
  }, { passive: false });
});

const button = document.querySelector("button");

button.addEventListener("click", function(e) {
  const circle = document.createElement("span");
  const diameter = Math.max(this.clientWidth, this.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.offsetX - radius}px`;
  circle.style.top = `${e.offsetY - radius}px`;

  this.appendChild(circle);

  setTimeout(() => {
    circle.remove();
  }, 600);
});

