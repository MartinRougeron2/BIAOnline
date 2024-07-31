<script lang="ts">
  import type { Activity } from "$lib/types/class/entities";
  import RtoViewer from "./RTOViewer.svelte";

  export let item: Activity;
</script>

<RtoViewer activity={item} heightCanvas={300} />
