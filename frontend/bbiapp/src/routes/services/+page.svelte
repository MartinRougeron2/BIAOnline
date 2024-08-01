<script lang="ts">
  import CrudTable from "$lib/components/crudTable.svelte";
  import type { Column, TableShape } from "$lib/components/table.types";
  import { Actions, Types } from "$lib/components/table.enums";
  import ModalColumns from "$lib/components/modalColumns.svelte";

  import { Button, Input } from "flowbite-svelte";
  import { PlusOutline } from "flowbite-svelte-icons";
  import { numberSecToTime } from "$lib/utils";
  import { Service } from "$lib/types/class/entities";
    import type { ServiceEntity } from "$lib/types/entities/service.entity";
    import { notificationStore } from "$lib/stores";

  export let data: {error: string, data: Service[]} = {error: "", data: []};

  let tableShape: TableShape = {
    columns: [
      {
        name: "ID",
        color: "blue",
        type: Types.text,
        field: (data: Service) => data.id,
        formVisible: false,
      },
      {
        name: "Name",
        color: "blue",
        type: Types.text,
        field: (data: Service) => data.name,
      },
      {
        name: "Description",
        color: "blue",
        type: Types.text,
        field: (data: Service) => data.description,
        tableVisible: false,
      },
      {
        name: "Owner",
        color: "blue",
        type: Types.text,
        field: (data: Service) => data.owner,
        tableVisible: false,
      },
      {
        name: "Status",
        color: "blue",
        type: Types.text,
        field: (data: Service) => data.status,
        tableVisible: false,
      },
      {
        name: "Location",
        color: "blue",
        type: Types.text,
        field: (data: Service) => data.location,
      },
      {
        name: "Recovery Time Objective (seconds)",
        color: "blue",
        type: Types.number,
        field: (data: Service) => numberSecToTime(data.RTO),
        fieldName: "RTO",
      },
      {
        name: "Recovery Point Objective (seconds)",
        color: "blue",
        type: Types.number,
        field: (data: Service) => numberSecToTime(data.RPO),
        fieldName: "RPO",
      },
      {
        name: "Vendor Name",
        color: "blue",
        type: Types.select,
        field: (data: Service) => data.vendor.name,
        fieldName: "vendorId",
        choices: [
          { value: 1, label: "Vendor 1" },
          { value: 2, label: "Vendor 2" },
          { value: 3, label: "Vendor 3" },
          { value: 4, label: "Vendor 4" },
          { value: 5, label: "Vendor 5" },
        ],
      },
      {
        name: "Tags",
        color: "blue",
        type: Types.tags,
        field: (data: Service) => data.tags,
      },
      {
        name: "Created At",
        color: "blue",
        type: Types.date,
        field: (data: Service) => data.createdAtDate.toLocaleDateString(),
        formVisible: false,
        tableVisible: false,
      },
    ],
    actions: [Actions.edit, Actions.delete],
    endpoint: "services",
    titleColumn: "Name",
  };

  let createModalState: boolean = false;

  let createData: Service = new Service({
    id: 0,
    name: "",
    description: "",
    owner: "",
    status: "",
    location: "",
    RTO: 0,
    RPO: 0,
    vendorId: 0,
    tags: [],
    createdAt: (new Date()).toLocaleDateString(),
    updatedAt: (new Date()).toLocaleDateString(),
    vendor: {
      id: 0,
      name: "",
      defaultRPO: 0,
      defaultRTO: 0,
    },
  });

  let checkItems: number[] = [];

  function updateData(event: CustomEvent) {
    const newService: ServiceEntity = event.detail.data;
    notificationStore.show("Service: <strong>" + newService.name + "</strong> updated successfully", "success");
    const id: number = event.detail.id;
    const index: number = data.data.findIndex((service) => service.id === id);
    data.data[index] = new Service(newService);
  }
</script>

<main>
  <div class="vendors">
    <p class="text-2xl font-bold">Services</p>
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
        <PlusOutline name="add" class="mr-2" /> Add New Service
      </Button>
    </div>

    {#if data.data && data.data.length > 0}
      <CrudTable TableShape={tableShape} TableData={data.data} bind:checkItems on:save={updateData}/>
    {:else}
      <p>No data</p>
    {/if}

    <ModalColumns
      columns={tableShape.columns}
      dataToEdit={createData}
      title="Create New Service"
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
