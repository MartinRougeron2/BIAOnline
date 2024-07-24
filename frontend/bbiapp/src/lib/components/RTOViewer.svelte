<script lang="ts">
  import type { Activity } from "$lib/types/class/entities";
  import { impactsTimelineToImpactType, numberSecToTime } from "$lib/utils";

  import { Bar, Line } from "svelte-chartjs";
  import "chart.js/auto";
  import "chartjs-adapter-moment";
  import type { ImpactActivity } from "$lib/types/entities/impact.entity";
  import type { ImpactType } from "./impactEvaulation.types";
  import type { ServiceActivity } from "$lib/types/entities/service.entity";
  import { Input, Range } from "flowbite-svelte";

  export let activity: Activity;

  const maxImpact = (impacts: ImpactActivity[]) => {
    let max = 0;
    impacts.forEach((impact) => {
      impact.impacts.forEach((impact) => {
        if (impact > max) {
          max = impact;
        }
      });
    });
    return max;
  };

  function getLabels(
    impacts: ImpactActivity[],
    services: ServiceActivity[]
  ): number[] {
    let scales: number[] = [0];

    impacts.forEach((impact) => {
      impact.timeline.forEach((time) => {
        if (!scales.includes(time)) scales.push(time);
      });
    });
    services.forEach((service) => {
      if (!scales.includes(service.RTO)) scales.push(service.RTO);
    });

    return scales.sort((a, b) => a - b);
  }

  $: impacts = activity.impacts.map((impact) => {
    return impactsTimelineToImpactType(impact, maxImpact(activity.impacts));
  });

  let heightCanvas: number = 600;
  let noname: boolean = false;

  const borderColor = (color: string, opacity: number = 1) => {
    let colorMap: { [key: string]: string } = {
      "Impact Finance": "#007bff",
      "Impact Image": "#dc3545",
      "Impact Organization": "#28a745",
      "Impact Juri": "#ffc107",
      "Max Impact": "#6f42c1",
    };
    const opacityHex = Math.floor(opacity * 255);
    return colorMap[color] + opacityHex.toString(16);
  };

  const randomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  function stringToHashHexColor(str: string): string {
    const hashF = (str: string) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }

      return hash;
    };
    let hash = hashF(str) ** 2 % 0xffffff;
    return "#" + hash.toString(16);
  }

  // [1, 2, 3] <=> [1, 8, 10] => [1, 1, 1, 2, 3, 3] <=> [1, 2, 3, 8, 10, 11]
  function factoryImpact(
    data: number[],
    baseScale: number[],
    newScale: number[]
  ) {
    let dataMap: { [key: number]: number } = {};

    baseScale.forEach((scale, index) => {
      dataMap[scale] = data[index];
    });

    let newDataMap: { [key: number]: number } = {};
    let prevScale = 0;
    newScale.forEach((scale, index) => {
      if (dataMap[scale]) {
        newDataMap[scale] = dataMap[scale];
        prevScale = dataMap[scale];
      } else {
        newDataMap[scale] = prevScale;
      }
    });

    return newScale.map((scale) => newDataMap[scale]);
  }

  $: xAxisImpacts = activity.impacts[0].timeline;
  $: xAxisServices = activity.services.map((service) => service.RTO);
  // $: xAxis = xAxisImpacts.concat([activity.RTO]).sort((a, b) => a - b);
  $: xAxis = xAxisImpacts
    .concat(xAxisServices)
    .concat([0, activity.RTO])
    .sort((a, b) => a - b);

  $: datasetImpacts = impacts.map((impact, index) => {
    impact.impacts.map((impact) => impact.impactSize);
    return {
      type: "line",
      label: impact.name,
      data: factoryImpact(
        impact.impacts.map((impact) => impact.impactSize),
        xAxisImpacts,
        xAxis
      ).map((impact, index) => {
        return {
          x: xAxis[index],
          y: impact,
        };
      }),
      interaction: {
        mode: "y",
      },
      borderColor: borderColor(impact.name, 0.8),
      backgroundColor: borderColor(impact.name, 0.3),
      tension: 0.01,
      pointRadius: 4,
    };
  });

  function setIndexBar(data: number, labels: number[]) {
    let newData: number[] = labels.map((label) => 0);
    let index = labels.findIndex((label) => label === data);
    newData[index] = maxImpact(activity.impacts);
    return newData;
  }

  $: RTOVertical = {
    type: "bar",
    label: "RTO: " + numberSecToTime(activity.RTO),
    data: [
      {
        x: activity.RTO,
        y: maxImpact(activity.impacts),
      },
    ],
    // red visible line (small width)
    borderColor: "rgb(255, 0, 0)",
    backgroundColor: "rgb(255, 0, 0, 0.3)",
    fill: false,
    yAxisID: "xRTORange",
    // dashed bar
    barThickness: 10,
    pointRadius: 0,
    borderWidth: 1,
  };

  $: serviceImpacts = activity.services.map((service) => {
    const dataReshaped = factoryImpact([1], [service.RTO], xAxis).filter(
      (data) => data !== 0
    );
    return {
      label: service.name + " : " + numberSecToTime(service.RTO),
      data: Array(xAxis.length - dataReshaped.length + 1)
        .fill(service.name)
        .map((name, index) => {
          return {
            x: xAxis[index],
            y: name,
          };
        }),
      tension: 0.01,
      pointRadius: 0,
      borderWidth: 5,
      yAxisID: "y2",
      borderDash: [5, 1],
      backgroundColor: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea } = chart;
        if (!chartArea) {
          return;
        }
        const index = xAxis.findIndex((time) => time === service.RTO);
        if (index > xAxis.findIndex((time) => time === activity.RTO)) {
          return "rgb(255, 0, 0)";
        } else {
          return stringToHashHexColor(service.name);
        }
      },
      // borderColor: (context: any) => {
      //     const chart = context.chart;
      //     const {ctx, chartArea} = chart;
      //     if (!chartArea) {
      //         return;
      //     }
      //     // if index > RTO activity draw it red otherwise => stringToHashHexColor(service.name)
      //     const index = xAxis.findIndex(time => time === service.RTO);
      //     if (index > xAxis.findIndex(time => time === activity.RTO)) {
      //         return 'rgb(255, 0, 0)';
      //     } else {
      //         return stringToHashHexColor(service.name);
      //     }
      // },
      borderColor: stringToHashHexColor(service.name),
    };
  });

  console.log(serviceImpacts);

  $: data = {
    labels: xAxis.map((time) => numberSecToTime(time)),
    datasets: [...datasetImpacts, RTOVertical, ...serviceImpacts],
  };

  $: options = {
    responsive: true,
    animation: false,
    scales: {
      y: {
        type: "linear",
        position: "left",
        stack: "t",
        beginAtZero: true,
      },
      y2: {
        type: "category",
        labels: activity.services
          .sort((a, b) => a.RTO - b.RTO)
          .map((service) => service.name),
        offset: true,
        position: "left",
        stack: "t",
        border: {
          color: "black",
          width: 1,
        },
        // on draw i
      },
      x: {
        type: "timeseries",
        position: "bottom",
        ticks: {
          callback: function (value: number, index: number, values: number[]) {
            return numberSecToTime(value);
          },
        },
      },
      xRTORange: {
        type: "linear",
        position: "right",
        stack: "t",
        beginAtZero: true,
        // remove scale
        display: false,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "right",
      },
      tooltip: {
        callbacks: {
          title: function (context: any) {
            console.log(context);
            if (context[0].dataset.yAxisID === "y2") {
              return context[0].raw.y + ": RTO";
            }
            return context[0].dataset.label;
          },
          label: function (context: any) {
            if (context.dataset.yAxisID === "y2") {
              return "RTO: " + numberSecToTime(context.raw.x);
            }
            return "Impact: " + context.raw.y;
          },
        },
      },
    },
  };

  console.log(options);
</script>

<div class="flex flex-col impact-view" style="height: {heightCanvas}px">
  <Line {data} {options} id="impact-view" />
</div>
