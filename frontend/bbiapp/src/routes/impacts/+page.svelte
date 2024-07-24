<script lang="ts">
  import { Button } from "flowbite-svelte";
  import EditImpacts from "$lib/components/editImpacts.svelte";
  import ViewMaxImpact from "$lib/components/viewMaxImpact.svelte";
  import ImpactView from "$lib/components/viewImpact.svelte";
  import type { ImpactType } from "$lib/components/impactEvaulation.types";

  let impactsInit: ImpactType[] = [
    {
      name: "Impact Financial",
      scaleMin: 0,
      scaleMax: 10,
      // yellowish to red
      colors: [
        "#FFFFFF", // White
        "#FFFFCC", // Light Yellow
        "#FFFF99", // Pale Yellow
        "#FFFF00", // Yellow
        "#FFCC00", // Light Orange
        "#FF9900", // Orange
        "#FF6600", // Deep Orange
        "#FF3300", // Light Red
        "#FF0000", // Red
        "#CC0000", // Extreme Red
      ],
      impacts: [
        {
          time: 3600,
          impactSize: 0,
        },
        {
          time: 7200,
          impactSize: 1,
        },
        {
          time: 10800,
          impactSize: 2,
        },
        {
          time: 14400,
          impactSize: 3,
        },
        {
          time: 18000,
          impactSize: 4,
        },
        {
          time: 21600,
          impactSize: 5,
        },
        {
          time: 25200,
          impactSize: 5,
        },
        {
          time: 43200,
          impactSize: 5,
        },
        {
          time: 46800,
          impactSize: 5,
        },
        {
          time: 50400,
          impactSize: 5,
        },
        {
          time: 54000,
          impactSize: 5,
        },
        {
          time: 57600,
          impactSize: 5,
        },
        {
          time: 61200,
          impactSize: 6,
        },
        {
          time: 64800,
          impactSize: 7,
        },
        {
          time: 68400,
          impactSize: 8,
        },
        {
          time: 72000,
          impactSize: 8,
        },

        {
          time: 86400,
          impactSize: 9,
        },
        {
          time: 129600,
          impactSize: 10,
        },
      ],
    },
    {
      name: "Impact Social",
      scaleMin: 0,
      scaleMax: 10,
      // yellowish to red, with 10 gradients (items)
      colors: [
        "#FFFFFF", // White
        "#FFFFCC", // Light Yellow
        "#FFFF99", // Pale Yellow
        "#FFFF00", // Yellow
        "#FFCC00", // Light Orange
        "#FF9900", // Orange
        "#FF6600", // Deep Orange
        "#FF3300", // Light Red
        "#FF0000", // Red
        "#CC0000", // Extreme Red
      ],
      impacts: [
        {
          time: 3600,
          impactSize: 0,
        },
        {
          time: 7200,
          impactSize: 1,
        },
        {
          time: 10800,
          impactSize: 2,
        },
        {
          time: 14400,
          impactSize: 3,
        },
        {
          time: 18000,
          impactSize: 4,
        },
        {
          time: 21600,
          impactSize: 5,
        },
        {
          time: 25200,
          impactSize: 5,
        },
        {
          time: 43200,
          impactSize: 5,
        },
        {
          time: 46800,
          impactSize: 5,
        },
        {
          time: 50400,
          impactSize: 5,
        },
        {
          time: 54000,
          impactSize: 5,
        },
        {
          time: 57600,
          impactSize: 5,
        },
        {
          time: 61200,
          impactSize: 6,
        },
        {
          time: 64800,
          impactSize: 7,
        },
        {
          time: 68400,
          impactSize: 8,
        },
        {
          time: 72000,
          impactSize: 8,
        },

        {
          time: 86400,
          impactSize: 9,
        },
        {
          time: 129600,
          impactSize: 10,
        },
      ],
    },
    {
      name: "Impact Environmental",
      scaleMin: 0,
      scaleMax: 10,
      // yellowish to red
      colors: [
        "#FFFFFF", // White
        "#FFFFCC", // Light Yellow
        "#FFFF99", // Pale Yellow
        "#FFFF00", // Yellow
        "#FFCC00", // Light Orange
        "#FF9900", // Orange
        "#FF6600", // Deep Orange
        "#FF3300", // Light Red
        "#FF0000", // Red
        "#CC0000", // Extreme Red
      ],
      impacts: [
        {
          time: 3600,
          impactSize: 0,
        },
        {
          time: 7200,
          impactSize: 1,
        },
        {
          time: 10800,
          impactSize: 2,
        },
        {
          time: 14400,
          impactSize: 3,
        },
        {
          time: 18000,
          impactSize: 4,
        },
        {
          time: 21600,
          impactSize: 5,
        },
        {
          time: 25200,
          impactSize: 5,
        },
        {
          time: 43200,
          impactSize: 5,
        },
        {
          time: 46800,
          impactSize: 5,
        },
        {
          time: 50400,
          impactSize: 5,
        },
        {
          time: 54000,
          impactSize: 5,
        },
        {
          time: 57600,
          impactSize: 5,
        },
        {
          time: 61200,
          impactSize: 6,
        },
        {
          time: 64800,
          impactSize: 7,
        },
        {
          time: 68400,
          impactSize: 8,
        },
        {
          time: 72000,
          impactSize: 8,
        },

        {
          time: 86400,
          impactSize: 9,
        },
        {
          time: 129600,
          impactSize: 10,
        },
      ],
    },
  ];

  let modalState: boolean = false;
</script>

<main>
  <div class="flex justify-between mt-4">
    <h1 class="text-2xl font-bold">Impacts</h1>
    <Button color="blue" on:click={() => (modalState = true)}>Edit</Button>
  </div>
  <div class="grid grid-cols-6 gap-4 mt-4 impacts">
    <div class="col-span-3">
      <ImpactView bind:impact={impactsInit[0]} />
    </div>
    <div class="col-span-3">
      <ImpactView bind:impact={impactsInit[1]} />
    </div>
    <div class="col-span-3">
      <ImpactView bind:impact={impactsInit[2]} />
    </div>
    <div class="col-span-3">
      <ViewMaxImpact bind:impacts={impactsInit} />
    </div>
  </div>

  <EditImpacts bind:impacts={impactsInit} bind:modalState />
</main>

<style>
  .impacts {
    min-width: 80vw;
  }
</style>
