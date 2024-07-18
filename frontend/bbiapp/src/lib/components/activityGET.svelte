<script lang="ts">
    import { Activity } from "$lib/types/class/entities";

    export let item: Activity | any;
</script>
{#if item}
<div>
    <p class="text-lg font-bold">{item.name}</p>
    <p class="text-sm">{item.description}</p>
</div>
{:else}
<p>No activity selected</p>
{/if}