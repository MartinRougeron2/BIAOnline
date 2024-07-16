<script lang="ts">
    import EditImpacts from "$lib/components/editImpacts.svelte";
  import type { ImpactType } from "$lib/components/impactEvaulation.types";

    let impactsInit : ImpactType[] = [
        {
            name: 'Impact Financial',
            scaleMin: 0,
            scaleMax: 10,
            // yellowish to red
            colors: [
                '#FFFFFF',  // White
                '#FFFFCC',  // Light Yellow
                '#FFFF99',  // Pale Yellow
                '#FFFF00',  // Yellow
                '#FFCC00',  // Light Orange
                '#FF9900',  // Orange
                '#FF6600',  // Deep Orange
                '#FF3300',  // Light Red
                '#FF0000',  // Red
                '#CC0000'   // Extreme Red
            ],
            impacts: [
                {
                    time: 3600,
                    impactSize: 0
                },
                {
                    time: 7200,
                    impactSize:0
                },
                {
                    time: 10800,
                    impactSize:0
                },
                {
                    time: 14400,
                    impactSize:0
                },
                {
                    time: 18000,
                    impactSize:0
                },
                {
                    time: 21600,
                    impactSize:0
                },
                {
                    time: 25200,
                    impactSize:0
                },
                {
                    time: 43200,
                    impactSize: 0
                },
                {
                    time: 46800,
                    impactSize: 0
                },
                {
                    time: 50400,
                    impactSize: 0
                },
                {
                    time: 54000,
                    impactSize: 0
                },
                {
                    time: 57600,
                    impactSize: 0
                },
                {
                    time: 61200,
                    impactSize: 0
                },
                {
                    time: 64800,
                    impactSize: 0
                },
                {
                    time: 68400,
                    impactSize: 0
                },
                {
                    time: 72000,
                    impactSize: 0
                },
                
                {
                    time: 86400,
                    impactSize: 0
                },
                {
                    time: 129600,
                    impactSize: 0
                }
            ]

        },
        {
            name: 'Impact Social',
            scaleMin: 0,
            scaleMax: 10,
            // yellowish to red, with 10 gradients (items)
            colors: [
                '#FFFFFF',  // White
                '#FFFFCC',  // Light Yellow
                '#FFFF99',  // Pale Yellow
                '#FFFF00',  // Yellow
                '#FFCC00',  // Light Orange
                '#FF9900',  // Orange
                '#FF6600',  // Deep Orange
                '#FF3300',  // Light Red
                '#FF0000',  // Red
                '#CC0000'   // Extreme Red
            ],
            impacts: [
                {
                    time: 3600,
                    impactSize: 0
                },
                {
                    time: 7200,
                    impactSize:0
                },
                {
                    time: 10800,
                    impactSize:0
                },
                {
                    time: 14400,
                    impactSize:5
                },
                {
                    time: 18000,
                    impactSize:5
                },
                {
                    time: 21600,
                    impactSize:5
                },
                {
                    time: 25200,
                    impactSize:0
                },
                {
                    time: 43200,
                    impactSize: 0
                },
                {
                    time: 46800,
                    impactSize: 0
                },
                {
                    time: 50400,
                    impactSize: 0
                },
                {
                    time: 54000,
                    impactSize: 0
                },
                {
                    time: 57600,
                    impactSize: 0
                },
                {
                    time: 61200,
                    impactSize: 0
                },
                {
                    time: 64800,
                    impactSize: 0
                },
                {
                    time: 68400,
                    impactSize: 0
                },
                {
                    time: 72000,
                    impactSize: 0
                },
                
                {
                    time: 86400,
                    impactSize: 0
                },
                {
                    time: 129600,
                    impactSize: 0
                }
            ]

        },
        {
            name: 'Impact Environmental',
            scaleMin: 0,
            scaleMax: 10,
            // yellowish to red
            colors: [
                '#FFFFFF',  // White
                '#FFFFCC',  // Light Yellow
                '#FFFF99',  // Pale Yellow
                '#FFFF00',  // Yellow
                '#FFCC00',  // Light Orange
                '#FF9900',  // Orange
                '#FF6600',  // Deep Orange
                '#FF3300',  // Light Red
                '#FF0000',  // Red
                '#CC0000'   // Extreme Red
            ],
            impacts: [
                {
                    time: 3600,
                    impactSize: 0
                },
                {
                    time: 7200,
                    impactSize:0
                },
                {
                    time: 10800,
                    impactSize:0
                },
                {
                    time: 14400,
                    impactSize:0
                },
                {
                    time: 18000,
                    impactSize:0
                },
                {
                    time: 21600,
                    impactSize:0
                },
                {
                    time: 25200,
                    impactSize:0
                },
                {
                    time: 43200,
                    impactSize: 0
                },
                {
                    time: 46800,
                    impactSize: 0
                },
                {
                    time: 50400,
                    impactSize: 0
                },
                {
                    time: 54000,
                    impactSize: 0
                },
                {
                    time: 57600,
                    impactSize: 0
                },
                {
                    time: 61200,
                    impactSize: 0
                },
                {
                    time: 64800,
                    impactSize: 0
                },
                {
                    time: 68400,
                    impactSize: 0
                },
                {
                    time: 72000,
                    impactSize: 0
                },
                
                {
                    time: 86400,
                    impactSize: 0
                },
                {
                    time: 129600,
                    impactSize: 0
                }
            ]
        }
    ]

    let modalState: boolean = true;
    $: impactChooseIndex = 0;

</script>

<main>
    
</main>