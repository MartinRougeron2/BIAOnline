<script lang="ts">
  import ViewMaxImpact from "$lib/components/viewMaxImpact.svelte";
  import EditImpacts from "$lib/components/editImpacts.svelte";
  import RtoViewer from "$lib/components/RTOViewer.svelte";

  import { Range, Button } from "flowbite-svelte";
  import { AngleDownOutline, AngleUpOutline } from "flowbite-svelte-icons";
  import { impactsTimelineToImpactType, numberSecToTime } from "$lib/utils";
  import { Activity } from "$lib/types/class/entities";
  import ViewImpact from "$lib/components/viewImpact.svelte";

  export let item: Activity;

  let modalState: boolean = false;

  $: dynamicImpacts = item.impacts.map((impact) =>
    impactsTimelineToImpactType(impact, 5),
  );

  $: impactShow = false;
</script>

<main>
  <span class="text-2xl font-bold text-center">
    {item.name}
  </span>
  <div class="bg-gray-100 p-4 mt-4 rounded">
    <div class="flex justify-between my-4">
      <div class="flex">
        <Button
          color="dark"
          on:click={() => (impactShow = !impactShow)}
          outline
          class="mr-4"
          size="sm"
        >
          {#if impactShow}
            <AngleUpOutline />
          {:else}
            <AngleDownOutline />
          {/if}
        </Button>
        <p class="text-2xl">Impacts</p>
      </div>
      <Button color="blue" on:click={() => (modalState = !modalState)}
        >Edit</Button
      >
    </div>
    {#if impactShow}
      <div class="grid grid-cols-4 gap-4 mt-4 impacts">
        {#each dynamicImpacts as impact}
          <ViewImpact {impact} heightCanvas={200} />
        {/each}
      </div>
      <div class="mt-4 max-impact">
        <ViewMaxImpact bind:impacts={dynamicImpacts} />
      </div>
    {/if}
    <EditImpacts
      impacts={dynamicImpacts}
      bind:modalState
      bind:activityImpacts={item.impacts}
    />
  </div>
  <div class="mt-4">
    <span class="text-lg font-bold">RTO: {numberSecToTime(item.RTO)}</span>
    <Range
      min={0}
      max={Math.max(
        ...item.impacts.map((impact) => Math.max(...impact.timeline)),
      )}
      bind:value={item.RTO}
      step={3600}
    />
    <RtoViewer bind:activity={item} />
  </div>
</main>

<style>
  .max-impact {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  main {
    height: 100%;
    width: 80vw;
  }
</style>
