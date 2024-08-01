<script lang="ts">
  import { goto } from "$app/navigation";
  import ActivityGet from "$lib/components/activityGET.svelte";
  import { Activity, Impact, Service, Team } from "$lib/types/class/entities";
  import { Spinner } from "flowbite-svelte";
  import { notificationStore } from "../../../lib/stores";
  import { onMount } from "svelte";
  import type { ServiceActivity } from "$lib/types/entities/service.entity";
  import { postData } from "$lib/auth";

  let defaultTimeLine: number[] = [3600, 7200, 10800, 86400, 172800, 259200];

  export let data: {
    error: string;
    data: { services: Service[]; teams: Team[] };
  } = { error: "", data: { services: [], teams: [] } };

  let newData: Activity = new Activity({
    id: 0,
    name: "",
    description: "",
    owner: "",
    status: "",
    location: "",
    RTO: 0,
    RPO: 0,
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    criticality: "",
    validation: "",
    volume: "",
    frequency: "",
    services: [],
    teams: [],
    impacts: [
      {
        id: 0,
        name: "Financial Impact",
        timeline: defaultTimeLine,
        impacts: [0, 1, 1, 1, 1, 1],
      },
      {
        id: 0,
        name: "Reputation Impact",
        timeline: defaultTimeLine,
        impacts: [0, 1, 1, 1, 1, 1],
      },
      {
        id: 0,
        name: "Operational Impact",
        timeline: defaultTimeLine,
        impacts: [0, 1, 1, 1, 1, 1],
      },
      {
        id: 0,
        name: "Regulatory Impact",
        timeline: defaultTimeLine,
        impacts: [0, 1, 1, 1, 1, 1],
      },
    ],
  });
  console.log(newData);

  function saveActivity(event: CustomEvent<Activity>) {
    console.log(event.detail);

    // go to activity page
    if (event.detail.id === 0) {
      notificationStore.show("Activity saved successfully ", "success");
      goto(`/activities`);
      postData("activities", event.detail);
    }
  }
</script>

{#if newData}
  <ActivityGet
    bind:item={newData}
    on:save={saveActivity}
    teams={data.data.teams}
    services={data.data.services}
  ></ActivityGet>
{:else}
  <Spinner />
{/if}
