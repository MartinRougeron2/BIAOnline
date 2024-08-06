<script lang="ts">
  import { Activity } from "$lib/types/class/entities";

  import Loader from "$lib/components/Loader.svelte";
  import ActivityDashboard from "$lib/components/activityDashboard.svelte";
  import { onMount } from "svelte";

  export let data: { error: string; data: Activity[] } = {
    error: "",
    data: [],
  };

  $: mounted = false;

  $: print = false;

  onMount(() => {
    mounted = true;
    if (data.data.length > 0 && !print) {
      print = true;
      window.scrollTo(0, 0);
      window.document.title = "Activities";
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  });

  $: {
    // when data changes, update the activity
    if (data.data.length > 0 && !print) {
      if (mounted) {
        print = true;
        window.scrollTo(0, 0);
        window.document.title = "Activities";
        setTimeout(() => {
          window.print();
        }, 1000);
      }
    }
  }
</script>

<div style="transition: all 0.5s;" class="w-full h-full">
  {#if data.error}
    <p>{data.error}</p>
  {:else if data.data.length > 0}
    {#each data.data as activity, index}
      <ActivityDashboard item={activity} />
      <div
        class="border-b border-gray-200 {index !== data.data.length - 1
          ? 'pagebreak'
          : 'clear'}"
      ></div>
    {/each}
  {/if}
</div>

<style>
  @media print {
    .pagebreak {
      page-break-after: always;
    } /* page-break-before works, as well */
  }
</style>
