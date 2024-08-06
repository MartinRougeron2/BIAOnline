<script lang="ts">
  import { Line } from "svelte-chartjs";
  import "chart.js/auto";
  import { numberSecToTime } from "$lib/utils";

  import type { ImpactType } from "$lib/components/impactEvaulation.types";

  export let impacts: ImpactType[];

  export let heightCanvas: number = 200;

  const chartColors = [
    "#007bffaa",
    "#dc3545aa",
    "#28a745aa",
    "#ffc107aa",
    "#6f42c1aa",
    "#fd7e14aa",
    "#17a2b8aa",
  ];

  $: data = {
    labels: impacts[0].impacts.map((impact) => numberSecToTime(impact.time)),
    datasets: [...impacts].map((impact, index) => {
      return {
        label: impact.name,
        data: impact.impacts.map((impact) => impact.impactSize),
        interaction: {
          mode: "y",
        },
        borderColor: chartColors[index % chartColors.length],
        fill: true,
        backgroundColor: chartColors[index % chartColors.length],
        tension: 0.01,
        pointRadius: 4,
      };
    }),
  };

  $: options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: impacts[0].scaleMax + 1,
        min: impacts[0].scaleMin,
        ticks: {
          callback: function (value: number) {
            return value > impacts[0].scaleMax ? "" : value;
          },
        },
      },
      x: {
        beginAtZero: true,
      },
    },
    animation: false,
    plugins: {
      legend: {
        display: true,
        title: {
          display: true,
          text: "Impact Evaluation Maximum",
          font: {
            size: 20,
          },
        },
      },
    },
  };
</script>

<div class="flex flex-col impact-view" style="height: {heightCanvas}px">
  <Line {data} {options} />
</div>
