<script lang="ts">
  import { goto } from "$app/navigation";
  import ActivityGet from "$lib/components/activityGET.svelte";
  import { Activity } from "$lib/types/class/entities";
  import { notificationStore } from "$lib/stores";

  import Loader from "$lib/components/Loader.svelte";
  import { patchData, type IResponse } from "$lib/auth";
  import ActivityDashboard from "$lib/components/activityDashboard.svelte";
  import { Button } from "flowbite-svelte";
  import {
    ForwardOutline,
    ForwardSolid,
    PrinterSolid,
  } from "flowbite-svelte-icons";

  export let data: { error: string; data: Activity[] } = {
    error: "",
    data: [],
  };

  let load = true;
  $: saving = false;

  setTimeout(() => {
    load = false;
  }, 1000);

  async function saveActivity(event: CustomEvent<Activity>) {
    // go to activity page
    if (event.detail.id) {
      saving = true;
      const res: IResponse = await patchData(
        "activities",
        event.detail.id,
        event.detail,
      );
      if (res.status !== 200) {
        switch (res.status) {
          case 500:
            notificationStore.show(
              "Server error, please try again later",
              "error",
            );
            break;
          default:
            notificationStore.show(
              "Activity not saved, please check the data",
              "error",
            );
            break;
        }
      } else {
        notificationStore.show("Activity saved successfully ", "success");
        goto(`/activities`);
      }
    }
  }
</script>

<div style="transition: all 0.5s;" class="w-full h-full">
  <div class="flex justify-between">
    <div>
      <p class="text-4xl font-bold">Dashboard Activities</p>
    </div>
    <!-- new tab -->
    <Button
      on:click={() => window.open("/dashprint", "_blank")}
      color="blue"
      size="lg"
    >
      Print
      <ForwardSolid class="ml-2" />
    </Button>
  </div>
  <div class="border-b border-gray-200 mt-6"></div>

  {#if data.error}
    <p>{data.error}</p>
  {:else if data.data.length > 0 && !load}
    {#if saving}
      <div
        style="opacity: 0.5;z-index: 1000;padding: 0;position: absolute;top: 0;left: 0;width: 100%;height: 100%;"
        class="flex justify-center items-center h-full"
      >
        <Loader loaderSize="lg" message="Saving..." dark />
      </div>
    {/if}
    {#each data.data as activity (activity.id)}
      <ActivityDashboard item={activity} on:save={saveActivity} />
      <div class="border-b border-gray-200"></div>
    {/each}
  {:else}
    <div class="flex justify-center items-center h-full">
      <Loader loaderSize="lg" message="Loading..." />
    </div>
  {/if}
</div>
