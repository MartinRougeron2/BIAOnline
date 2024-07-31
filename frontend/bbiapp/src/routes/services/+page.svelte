<script lang="ts">
  import CrudTable from "$lib/components/crudTable.svelte";
  import type { Column, TableShape } from "$lib/components/table.types";
  import { Actions, Types } from "$lib/components/table.enums";
  import ModalColumns from "$lib/components/modalColumns.svelte";

  import { Button, Input } from "flowbite-svelte";
  import { PlusOutline } from "flowbite-svelte-icons";
  import { numberSecToTime } from "$lib/utils";
  import { Service } from "$lib/types/class/entities";

  let mockData: Service[] = [
    new Service({
      id: 1,
      name: "Service 1",
      description: "Service 1 description",
      owner: "Owner 1",
      status: "Active",
      location: "Location 1",
      RTO: 5678889999,
      RPO: 665,
      vendorId: 1,
      tags: ["tag1", "tag2"],
      createdAt: new Date(),
      updatedAt: new Date(),
      vendor: {
        id: 1,
        name: "Vendor 1",
        defaultRPO: 560,
        defaultRTO: 560,
      },
    }),
    new Service({
      id: 2,
      name: "Service 2",
      description: "Service 2 description",
      owner: "Owner 2",
      status: "Active",
      location: "Location 2",
      RTO: 55556,
      RPO: 5,
      vendorId: 2,
      tags: ["tag1", "tag2"],
      createdAt: new Date(),
      updatedAt: new Date(),
      vendor: {
        id: 2,
        name: "Vendor 2",
        defaultRPO: 560,
        defaultRTO: 560,
      },
    }),
    new Service({
      id: 3,
      name: "Service 3",
      description: "Service 3 description",
      owner: "Owner 3",
      status: "Active",
      location: "Location 3",
      RTO: 345,
      RPO: 5465,
      vendorId: 3,
      tags: ["tag1", "tag2"],
      createdAt: new Date(),
      updatedAt: new Date(),
      vendor: {
        id: 3,
        name: "Vendor 3",
        defaultRPO: 560,
        defaultRTO: 560,
      },
    }),
    new Service({
      id: 4,
      name: "Service 4",
      description: "Service 4 description",
      owner: "Owner 4",
      status: "Active",
      location: "Location 4",
      RTO: 236785,
      RPO: 234567875,
      vendorId: 4,
      tags: ["tag1", "tag2"],
      createdAt: new Date(),
      updatedAt: new Date(),
      vendor: {
        id: 4,
        name: "Vendor 4",
        defaultRPO: 560,
        defaultRTO: 560,
      },
    }),
    new Service({
      id: 5,
      name: "Service 5",
      description: "Service 5 description",
      owner: "Owner 5",
      status: "Active",
      location: "Location 5",
      RTO: 5678905,
      RPO: 4565,
      vendorId: 5,
      tags: ["tag1", "tag2"],
      createdAt: new Date(),
      updatedAt: new Date(),
      vendor: {
        id: 5,
        name: "Vendor 5",
        defaultRPO: 560,
        defaultRTO: 560,
      },
    }),
  ];

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
        field: (data: Service) => data.createdAt.toLocaleDateString(),
        formVisible: false,
        tableVisible: false,
      },
    ],
    actions: [Actions.edit, Actions.delete],
    endpoint: "/services",
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
    createdAt: new Date(),
    updatedAt: new Date(),
    vendor: {
      id: 0,
      name: "",
      defaultRPO: 0,
      defaultRTO: 0,
    },
  });

  let checkItems: number[] = [];
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

    <CrudTable TableShape={tableShape} TableData={mockData} bind:checkItems />

    <ModalColumns
      columns={tableShape.columns}
      dataToEdit={createData}
      title="Create New Service"
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
