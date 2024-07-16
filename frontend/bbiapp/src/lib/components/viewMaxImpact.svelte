<script lang="ts">
    import { Line } from 'svelte-chartjs'
    import 'chart.js/auto';
    import { numberSecToTime } from "$lib/utils";

    import type { ImpactType } from "$lib/components/impactEvaulation.types";

    export let impacts: ImpactType[];

    const chartColors = [
        '#007bff',
        '#dc3545',
        '#28a745',
        '#ffc107',
        '#6f42c1',
        '#fd7e14',
        '#17a2b8',
    ];

    // $: maxImpacts = {
    //         name: 'Max Impact',
    //         impacts: impacts[0].impacts.map((impact, index) => {
    //             let max = 0;
    //             impacts.forEach(impact => {
    //                 if (impact.impacts[index].impactSize > max) {
    //                     max = impact.impacts[index].impactSize;
    //                 }
    //             });
    //             return {
    //                 time: impact.time,
    //                 impactSize: max
    //             }
    //         }),
    //         scaleMin: impacts[0].scaleMin,
    //         scaleMax: impacts[0].scaleMax,
    //         colors: impacts[0].colors
    //     } as ImpactType;
        
    $: data = {
        labels: impacts[0].impacts.map(impact => numberSecToTime(impact.time)),
        datasets: [...impacts].map((impact, index) => {
            return {
                label: impact.name,
                data: impact.impacts.map(impact => impact.impactSize),
                interaction: {
                    mode: 'y'
                },
                borderColor: chartColors[index % chartColors.length],
                fill: true,
                backgroundColor: chartColors[index % chartColors.length],
                tension: 0.01,
                pointRadius: 4
            }
        })
    };

    $: options = {
        scales: {
            y: {
                beginAtZero: true,
                max: impacts[0].scaleMax + 1,
                min: impacts[0].scaleMin,
            },
            x: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    };

</script>

<div class="flex flex-col impact-view">
    <Line {data} {options} />
</div>