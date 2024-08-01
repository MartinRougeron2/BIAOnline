<script lang="ts">
  import { Vendor } from "$lib/types/class/entities";
  import CrudTable from "$lib/components/crudTable.svelte";
  import type { Column, TableShape } from "$lib/components/table.types";
  import { numberSecToTime } from "$lib/utils";
  import { Actions, Types } from "$lib/components/table.enums";
  import ModalColumns from "$lib/components/modalColumns.svelte";

  import { Button, Input } from "flowbite-svelte";
  import { PlusOutline } from "flowbite-svelte-icons";

  export let data: {error: string, data: Vendor[]} = {error: "", data: []};

  let tableShape: TableShape = {
    columns: [
      {
        name: "ID",
        color: "blue",
        type: Types.text,
        field: (data: Vendor) => data.id,
        formVisible: false,
      },
      {
        name: "Name",
        color: "blue",
        type: Types.text,
        field: (data: Vendor) => data.name,
      },
      {
        name: "Description",
        color: "blue",
        type: Types.text,
        field: (data: Vendor) => data.description,
        tableVisible: false,
      },
      {
        name: "Contact",
        color: "blue",
        type: Types.text,
        field: (data: Vendor) => data.contact,
      },
      {
        name: "Status",
        color: "blue",
        type: Types.text,
        field: (data: Vendor) => data.status,
      },
      {
        name: "Tags",
        color: "blue",
        type: Types.tags,
        field: (data: Vendor) => data.tags,
      },
      {
        name: "Default Recovery Time Objective (seconds)",
        color: "blue",
        type: Types.number,
        field: (data: Vendor) => numberSecToTime(data.defaultRTO),
        fieldName: "defaultRTO",
      },
      {
        name: "Default Recovery Point Objective (seconds)",
        color: "blue",
        type: Types.number,
        field: (data: Vendor) => numberSecToTime(data.defaultRPO),
        fieldName: "defaultRPO",
      },
      {
        name: "Created At",
        color: "blue",
        type: Types.date,
        field: (data: Vendor) => data.createdAtDate.toLocaleDateString(),
        formVisible: false,
        tableVisible: false,
      },
    ],
    actions: [Actions.edit, Actions.delete],
    endpoint: "/vendors",
    titleColumn: "Name",
  };

  let createModalState: boolean = false;

  let createData: Vendor = new Vendor({
    id: 0,
    name: "",
    description: "",
    contact: "",
    status: "",
    tags: [],
    defaultRTO: 0,
    defaultRPO: 0,
    createdAt: (new Date()).toLocaleDateString(),
    updatedAt: (new Date()).toLocaleDateString(),
  });

  let checkItems: number[] = [];
</script>

<main>
  <div class="vendors">
    <p class="text-2xl font-bold">Vendors</p>
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
        <PlusOutline name="add" class="mr-2" /> Add New Vendor
      </Button>
    </div>


{#if data.data && data.data.length > 0}
      <CrudTable TableShape={tableShape} TableData={data.data} bind:checkItems />
      {:else}
      <p>No data</p>
      {/if}

    <ModalColumns
      columns={tableShape.columns.slice(1)}
      dataToEdit={createData}
      title="Create New Team"
      modalState={createModalState}
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
