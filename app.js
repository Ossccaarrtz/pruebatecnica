const movements = window.MOVEMENTS;

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

document.querySelector("#record-count").textContent =
  `${movements.length} movimientos disponibles entre enero y junio de 2026.`;

document.querySelector("#raw-rows").innerHTML = movements
  .map(
    (movement) => `
      <tr>
        <td>${movement.movement_date}</td>
        <td>${movement.plant}</td>
        <td>${movement.account_name}</td>
        <td>${movement.article_name}</td>
        <td>${movement.equipment_name ?? "Sin equipo"}</td>
        <td class="${movement.amount < 0 ? "negative" : ""}">
          ${currency.format(movement.amount)}
        </td>
      </tr>
    `,
  )
  .join("");

// KPIS

const netTotal = movements.reduce((sum, m) => sum + m.amount, 0);
const cancellations = movements.filter((m) => m.is_cancellation);
const cancelledAmount = cancellations.reduce(
  (sum, m) => sum + Math.abs(m.amount),
  0,
);

// Movimiento vigente de mayor importe
const topMovement = movements
  .filter((m) => !m.is_cancellation)
  .reduce((max, m) => (m.amount > max.amount ? m : max));

const kpis = [
  { label: "Gasto neto del periodo", value: currency.format(netTotal) },
  { label: "Movimientos", value: `${movements.length}` },
  {
    label: "Cancelaciones",
    value: `${cancellations.length} · ${currency.format(cancelledAmount)}`,
  },
  {
    label: "Mayor movimiento",
    value: currency.format(topMovement.amount),
    hint: `${topMovement.article_name} · ${topMovement.plant}`,
  },
];

document.querySelector("#kpis").innerHTML = kpis
  .map(
    (kpi) => `
      <div class="kpi">
        <span class="kpi-label">${kpi.label}</span>
        <span class="kpi-value">${kpi.value}</span>
        ${kpi.hint ? `<span class="kpi-hint">${kpi.hint}</span>` : ""}
      </div>
    `,
  )
  .join("");

// ---- Gráfica de línea

const monthLabels = {
  "2026-01": "Ene",
  "2026-02": "Feb",
  "2026-03": "Mar",
  "2026-04": "Abr",
  "2026-05": "May",
  "2026-06": "Jun",
};

// Meses ordenados presentes en los datos.
const months = [
  ...new Set(movements.map((m) => m.movement_date.slice(0, 7))),
].sort();

// Plantas presentes en los datos.
const plants = [...new Set(movements.map((m) => m.plant))].sort();

function netByPlant(plant) {
  return months.map((month) =>
    movements
      .filter((m) => m.plant === plant && m.movement_date.startsWith(month))
      .reduce((sum, m) => sum + m.amount, 0),
  );
}

const plantColors = ["#175cd3", "#12b76a", "#f79009"];

const datasets = plants.map((plant, i) => ({
  label: plant,
  data: netByPlant(plant),
  borderColor: plantColors[i % plantColors.length],
  backgroundColor: plantColors[i % plantColors.length],
  tension: 0.3,
  borderWidth: 2,
  pointRadius: 3,
}));

new Chart(document.querySelector("#spend-trend"), {
  type: "line",
  data: {
    labels: months.map((m) => monthLabels[m] ?? m),
    datasets,
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: ${currency.format(ctx.parsed.y)}`,
        },
      },
    },
    scales: {
      y: {
        ticks: { callback: (value) => currency.format(value) },
      },
    },
  },
});

// Tabla resumen: gasto neto por planta (ordenado de mayor a menor).
const plantTotals = plants
  .map((plant) => ({
    plant,
    total: netByPlant(plant).reduce((sum, value) => sum + value, 0),
  }))
  .sort((a, b) => b.total - a.total);

document.querySelector("#plant-totals").innerHTML = plantTotals
  .map(
    ({ plant, total }) => `
      <div class="kpi">
        <span class="kpi-label">${plant}</span>
        <span class="kpi-value">${currency.format(total)}</span>
      </div>
    `,
  )
  .join("");

// Gráfica de barras: gasto neto por categoría contable

const categoryTotals = {};
for (const m of movements) {
  categoryTotals[m.account_name] =
    (categoryTotals[m.account_name] ?? 0) + m.amount;
}

const sortedCategories = Object.entries(categoryTotals).sort(
  (a, b) => b[1] - a[1],
);

new Chart(document.querySelector("#spend-by-category"), {
  type: "bar",
  data: {
    labels: sortedCategories.map(([name]) => name),
    datasets: [
      {
        label: "Gasto neto",
        data: sortedCategories.map(([, total]) => total),
        backgroundColor: "#175cd3",
        borderRadius: 4,
      },
    ],
  },
  options: {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => currency.format(ctx.parsed.x),
        },
      },
    },
    scales: {
      x: {
        ticks: { callback: (value) => currency.format(value) },
      },
    },
  },
});

//  Hallazgo: artículo con mayor escalada de precio unitario
const priceHistory = {};
for (const m of movements) {
  if (m.is_cancellation) continue;
  (priceHistory[m.sku] ??= []).push({
    date: m.movement_date,
    price: m.unit_price,
    article: m.article_name,
    plant: m.plant,
    equipment: m.equipment_name,
  });
}

// Elige el SKU con mayor incremento relativo entre su primer y último precio.
let topEscalation = null;
for (const [sku, history] of Object.entries(priceHistory)) {
  if (history.length < 2) continue;
  const sorted = [...history].sort((a, b) => a.date.localeCompare(b.date));
  const first = sorted[0];
  const last = sorted[sorted.length - 1];
  const increase = (last.price - first.price) / first.price;
  if (!topEscalation || increase > topEscalation.increase) {
    topEscalation = { sku, sorted, first, last, increase };
  }
}

if (topEscalation) {
  const { sorted, first, last, increase } = topEscalation;
  const pct = Math.round(increase * 100);
  const item = last.article;
  const equipmentText = last.equipment ? ` del equipo ${last.equipment}` : "";

  document.querySelector("#finding-text").innerHTML = `
    <p>
      El precio  de <strong>${item}</strong>${equipmentText}
      (${last.plant}) subió de <strong>${currency.format(first.price)}</strong>
      a <strong>${currency.format(last.price)}</strong> entre
      ${first.date} y ${last.date}: subió un
      <strong>+${pct}%</strong> con la misma cantidad por compra.
    </p>
    <p class="finding-note">
      Esto no indica que se haya comprado MAS cantidad, sino que el precio subió, se podría recomendar revisar el proveedor actual
      o empezar a buscar alternativas para este artículo.
    </p>
  `;

  new Chart(document.querySelector("#price-trend"), {
    type: "line",
    data: {
      labels: sorted.map((p) => monthLabels[p.date.slice(0, 7)] ?? p.date),
      datasets: [
        {
          label: `Precio unitario · ${item}`,
          data: sorted.map((p) => p.price),
          borderColor: "#b42318",
          backgroundColor: "#b42318",
          tension: 0.3,
          borderWidth: 2,
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom" },
        tooltip: {
          callbacks: {
            label: (ctx) => currency.format(ctx.parsed.y),
          },
        },
      },
      scales: {
        y: {
          ticks: { callback: (value) => currency.format(value) },
        },
      },
    },
  });
}
