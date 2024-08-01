<script lang="ts">
  import CrudTable from "$lib/components/crudTable.svelte";
  import type { Column, TableShape } from "$lib/components/table.types";
  import { Actions, Types } from "$lib/components/table.enums";
  import ModalColumns from "$lib/components/modalColumns.svelte";

  import { Button, Input } from "flowbite-svelte";
  import { PlusOutline } from "flowbite-svelte-icons";
  import { Team } from "$lib/types/class/entities";
    import type { TeamEntity } from "$lib/types/entities/team.entity";
    import { notificationStore } from "$lib/stores";

  export let data: {error: string, data: Team[]} = {error: "", data: []};

  let tableShape: TableShape = {
    columns: [
      {
        name: "ID",
        color: "blue",
        type: Types.text,
        field: (data: Team) => data.id,
        formVisible: false,
      },
      {
        name: "Name",
        color: "blue",
        type: Types.text,
        field: (data: Team) => data.name,
      },
      {
        name: "Description",
        color: "blue",
        type: Types.text,
        field: (data: Team) => data.description,
      },
      {
        name: "Owner",
        color: "blue",
        type: Types.text,
        field: (data: Team) => data.owner,
      },
      {
        name: "Status",
        color: "blue",
        type: Types.text,
        field: (data: Team) => data.status,
      },
      {
        name: "Members Number",
        color: "blue",
        type: Types.number,
        field: (data: Team) => data.membersnumber,
      },
      {
        name: "Tags",
        color: "blue",
        type: Types.tags,
        field: (data: Team) => data.tags,
      },
      {
        name: "Created At",
        color: "blue",
        type: Types.date,
        field: (data: Team) => data.createdAtDate.toLocaleDateString(),
        formVisible: false,
      },
    ],
    actions: [Actions.edit, Actions.delete],
    endpoint: "teams",
    titleColumn: "Name",
  };

  let createModalState: boolean = false;

  let createData: Team = new Team({
    id: 0,
    name: "",
    description: "",
    owner: "",
    status: "",
    membersnumber: 0,
    tags: [],
    createdAt: (new Date()).toLocaleDateString(),
    updatedAt: (new Date()).toLocaleDateString(),
  });

  let checkItems: number[] = [];

  function updateData(event: CustomEvent) {
    const newTeam: TeamEntity = event.detail.data;
    notificationStore.show("Team: " + newTeam.name + " updated successfully", "success");
    const id: number = event.detail.id;
    if (id === 0) {
      data.data.push(new Team(newTeam));
      return;
    }
    const index: number = data.data.findIndex((team) => team.id === id);
    data.data[index] = new Team(newTeam);
  }
</script>

<main>
  <div class="vendors">
    <p class="text-2xl font-bold">Teams</p>
    <div class="flex justify-between">
      <Input
        type="text"
        id="search-table"
        placeholder="Search In The Table"
        class="mt-2"
        defaultClass="w-64"
      />

      <Button
        color="green"
        class="mt-2"
        on:click={() => (createModalState = true)}
      >
        <PlusOutline name="add" class="mr-2" /> Add New Team
      </Button>
    </div>

      {#if data.data && data.data.length > 0}
      <CrudTable TableShape={tableShape} TableData={data.data} bind:checkItems on:save={updateData} />
      {:else}
      <p>No data</p>
      {/if}

    <ModalColumns
      columns={tableShape.columns.slice(1)}
      dataToEdit={createData}
      title="Create New Team"
      modalState={createModalState}
      id={createData.id}
      endpoint={tableShape.endpoint}
    />
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
