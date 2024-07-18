<script lang="ts">
    import { Line } from 'svelte-chartjs'
    import 'chart.js/auto';


    import { numberSecToTime } from "$lib/utils";

    import type { ImpactType } from "$lib/components/impactEvaulation.types";

    export let impact: ImpactType;
    export let heightCanvas: number;
    export let noname: boolean = false;

    console.log(noname);

    let width: number, height: number, gradient: any;
    function getGradient(ctx: any, chartArea: any) {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
        // Create the gradient because this is either the first render
        // or the size of the chart has changed
        width = chartWidth;
        height = chartHeight;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        // yellowish to red
        gradient.addColorStop(0, '#FFFFFF');  // White
        gradient.addColorStop(0.1, '#FFFFCC');  // Light Yellow
        gradient.addColorStop(0.2, '#FFFF99');  // Pale Yellow
        gradient.addColorStop(0.3, '#FFFF00');  // Yellow
        gradient.addColorStop(0.4, '#FFCC00');  // Light Orange
        gradient.addColorStop(0.5, '#FF9900');  // Orange
        gradient.addColorStop(0.6, '#FF6600');  // Deep Orange
        gradient.addColorStop(0.7, '#FF3300');  // Light Red
        gradient.addColorStop(0.8, '#FF0000');  // Red
        gradient.addColorStop(0.9, '#CC0000');  // Extreme Red
  }

  return gradient;
}

    $: data = {
        labels: impact.impacts.map(impact => numberSecToTime(impact.time)),
        datasets: [{
            label: impact.name,
            data: impact.impacts.map(impact => impact.impactSize),
            interaction: {
                mode: 'y'
            },
            borderColor: 'rgb(30, 30, 30, 0.4)',
            fill: true,
            backgroundColor: function(context: any) {
                const chart = context.chart;
                const {ctx, chartArea} = chart;

                if (!chartArea) {
                // This case happens on initial chart load
                return;
                }
                return getGradient(ctx, chartArea);
            },
            tension: 0.31,
            pointRadius: 4,
            pointHoverRadius: 10,
            // pointBorderColor: 'rgb(0, 0, 0)',
            pointBackgroundColor: 'rgb(0, 0, 0, 0.5)',
            borderWidth: 2,
        }]
    };

    $: options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                includeZero: true,
                intersect: false,
                beginAtZero: true,
                max: impact.scaleMax + 1,
                min: impact.scaleMin,
            },
            x: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: !noname,
                text: impact.name,
                font: {
                    size: 20
                }
            }
        }
    };

</script>

<div class="flex flex-col impact-view" style="height: {heightCanvas}px">
    <Line {data} {options} />
</div>