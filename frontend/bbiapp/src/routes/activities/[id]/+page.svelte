<script lang="ts">
  import { goto } from "$app/navigation";
  import ActivityGet from "$lib/components/activityGET.svelte";
  import { Activity } from "$lib/types/class/entities";
  import { notificationStore } from "../../../lib/stores";

  import Loader from "$lib/components/Loader.svelte";
  import { patchData, type IResponse } from "$lib/auth";

  export let data: { error: string; data: Activity } = {
    error: "",
    data: new Activity(),
  };

  let load = true;
  $: saving = false;
  $: activity = new Activity(data.data);

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
  {#if data.error}
    <p>{data.error}</p>
  {:else if data.data.id && !load}
    {#if saving}
      <div
        style="opacity: 0.5;z-index: 1000;padding: 0;position: absolute;top: 0;left: 0;width: 100%;height: 100%;"
        class="flex justify-center items-center h-full"
      >
        <Loader loaderSize="lg" message="Saving..." dark />
      </div>
    {/if}
    <ActivityGet item={activity} on:save={saveActivity}></ActivityGet>
  {:else}
    <div class="flex justify-center items-center h-full">
      <Loader loaderSize="lg" message="Loading..." />
    </div>
  {/if}
</div>
