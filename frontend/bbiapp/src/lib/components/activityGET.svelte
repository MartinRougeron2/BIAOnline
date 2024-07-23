<script lang="ts">
    import { Activity } from "$lib/types/class/entities";
  import RtoViewer from "./RTOViewer.svelte";

    export let item: Activity;
</script>
{#if item}
<div>
    <p class="text-lg font-bold">{item.name}</p>
    <p class="text-sm">{item.description}</p>
    <RtoViewer activity={item} />
</div>
{:else}
<p>No activity selected</p>
{/if}