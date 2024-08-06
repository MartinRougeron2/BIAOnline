<script lang="ts">
  import CrudTable from "$lib/components/crudTable.svelte";
  import ActivityGet from "$lib/components/activityGET.svelte";
  import type { Column, TableShape } from "$lib/components/table.types";
  import { Actions, Types, Position } from "$lib/components/table.enums";
  import ModalColumns from "$lib/components/modalColumns.svelte";

  import { Button, Input } from "flowbite-svelte";
  import { DotsVerticalOutline, PlusOutline } from "flowbite-svelte-icons";
  import { numberSecToTime } from "$lib/utils";
  import { Activity } from "$lib/types/class/entities";
  import DetailActivity from "$lib/components/detailActivity.svelte";
  import type { ActivityEntity } from "$lib/types/entities/activity.entity";
  import { notificationStore } from "$lib/stores";

  let defaultTimeLine: number[] = [3600, 7200, 10800, 86400, 172800, 259200];

  export let data: { error: string; data: Activity[] } = {
    error: "",
    data: [],
  };

  let tableShape: TableShape = {
    columns: [
      {
        name: "ID",
        color: "blue",
        type: Types.text,
        field: (data: Activity) => data.id,
        formVisible: false,
        tableVisible: false,
      },
      {
        name: "Name",
        color: "blue",
        type: Types.href,
        field: (data: Activity) => data.name,
      },
      {
        name: "Description",
        color: "blue",
        type: Types.text,
        field: (data: Activity) => data.description,
        tableVisible: false,
      },
      {
        name: "Owner",
        color: "blue",
        type: Types.text,
        field: (data: Activity) => data.owner,
        tableVisible: false,
      },
      {
        name: "Status",
        color: "blue",
        type: Types.text,
        field: (data: Activity) => data.status,
        tableVisible: false,
      },
      {
        name: "Location",
        color: "blue",
        type: Types.text,
        field: (data: Activity) => data.location,
        tableVisible: false,
      },
      {
        name: "Services",
        color: "blue",
        type: Types.list,
        field: (data: Activity) => data.services.map((service) => service.name),
        tableVisible: true,
        choices: [
          { value: 1, label: "Service 1" },
          { value: 2, label: "Service 2" },
          { value: 3, label: "Service 3" },
          { value: 4, label: "Service 4" },
          { value: 5, label: "Service 5" },
        ],
      },
      {
        name: "Teams",
        color: "blue",
        type: Types.list,
        field: (data: Activity) => data.teams.map((team) => team.name),
        tableVisible: false,
        choices: [
          { value: 1, label: "Team 1" },
          { value: 2, label: "Team 2" },
          { value: 3, label: "Team 3" },
          { value: 4, label: "Team 4" },
          { value: 5, label: "Team 5" },
        ],
      },
      {
        name: "Impacts",
        color: "blue",
        type: Types.impact,
        field: (data: Activity) => data.impacts,
        tableVisible: true,
        choices: [
          { value: 1, label: "Impact 1" },
          { value: 2, label: "Impact 2" },
          { value: 3, label: "Impact 3" },
          { value: 4, label: "Impact 4" },
          { value: 5, label: "Impact 5" },
        ],
      },
      {
        name: "Recovery Time Objective (seconds)",
        color: "blue",
        type: Types.time,
        field: (data: Activity) => numberSecToTime(data.RTO),
      },
      {
        name: "Recovery Point Objective (seconds)",
        color: "blue",
        type: Types.time,
        field: (data: Activity) => numberSecToTime(data.RPO),
        tableVisible: false,
      },
      {
        name: "Criticality",
        color: "blue",
        type: Types.criticality,
        field: (data: Activity) => data.criticality,
        position: Position.center,
      },
      {
        name: "Validation",
        color: "blue",
        type: Types.text,
        field: (data: Activity) => data.validation,
      },
      {
        name: "Volume",
        color: "blue",
        type: Types.text,
        field: (data: Activity) => data.volume,
        tableVisible: false,
      },
      {
        name: "Frequency",
        color: "blue",
        type: Types.text,
        field: (data: Activity) => data.frequency,
        tableVisible: false,
      },
      {
        name: "Tags",
        color: "blue",
        type: Types.tags,
        field: (data: Activity) => data.tags,
      },
    ],
    actions: [Actions.delete, Actions.expand],
    endpoint: "activities",
    titleColumn: "Name",
    detailComponent: DetailActivity,
  };

  let checkItems: number[] = [];

  $: activities = data.data.map((activity) => new Activity(activity));

  function updateData(event: CustomEvent) {
    const newActivity: ActivityEntity = event.detail.data;
    notificationStore.show(
      "Activity: " + newActivity.name + " updated successfully",
      "success",
    );
    const id: number = event.detail.id;
    const index: number = data.data.findIndex((activity) => activity.id === id);
    data.data[index] = new Activity(newActivity);
  }
</script>

<main>
  <div class="vendors">
    <p class="text-2xl font-bold">Activities</p>
    <div class="flex justify-between">
      <Input
        type="text"
        id="search-table"
        placeholder="Search In The Table"
        class="mt-2"
        defaultClass="w-64"
      />

      <div>
        <Button color="green" class="mt-2" href="/activities/create">
          <PlusOutline name="add" class="mr-2" /> Add New Activity
        </Button>
        <Button color="light" class="mt-2">
          <DotsVerticalOutline name="dots-vertical" class="" />
        </Button>
      </div>
    </div>

    {#if data.data && data.data.length > 0}
      <CrudTable
        TableShape={tableShape}
        TableData={activities}
        bind:checkItems
        on:save={updateData}
      />
    {:else}
      <p>No data</p>
    {/if}
  </div>
</main>

<style>
  .vendors {
    padding: 12px;
  }

  main {
    height: 100%;
    width: 100%;
  }
</style>
