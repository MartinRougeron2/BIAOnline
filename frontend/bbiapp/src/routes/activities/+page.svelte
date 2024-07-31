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

  let defaultTimeLine: number[] = [3600, 7200, 10800, 86400, 172800, 259200];

  let mockData: Activity[] = [
    new Activity({
      id: 1,
      name: "Activity 1",
      description: "Activity 1 description",
      owner: "Owner 1",
      status: "Active",
      location: "Location 1",
      RTO: 57888,
      RPO: 665,
      tags: ["tag1", "tag2"],
      createdAt: new Date(),
      updatedAt: new Date(),
      criticality: "High",
      validation: "Mr. John Doe",
      volume: "4500 / 5000",
      frequency: "Daily",
      services: [
        {
          id: 1,
          name: "Severine",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 1, name: "Vendor 1" },
        },
        {
          id: 2,
          name: "LCL 2",
          RTO: 56788,
          RPO: 665,
          vendor: { id: 2, name: "Vendor 2" },
        },
        {
          id: 3,
          name: "Mimecast 1",
          RTO: 58,
          RPO: 665,
          vendor: { id: 3, name: "Vendor 3" },
        },
        {
          id: 4,
          name: "Service 4",
          RTO: 568,
          RPO: 665,
          vendor: { id: 4, name: "Vendor 4" },
        },
        {
          id: 5,
          name: "Service 5",
          RTO: 56888,
          RPO: 665,
          vendor: { id: 5, name: "Vendor 5" },
        },
      ],
      teams: [
        { id: 1, name: "Team 1" },
        { id: 2, name: "Team 2" },
        { id: 3, name: "Team 3" },
        { id: 4, name: "Team 4" },
        { id: 5, name: "Team 5" },
      ],
      impacts: [
        {
          id: 1,
          name: "Impact Finance",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 3, 5, 5],
        },
        {
          id: 2,
          name: "Impact Image",
          timeline: defaultTimeLine,
          impacts: [0, 1, 1, 1, 1, 1],
        },
        {
          id: 3,
          name: "Impact Organization",
          timeline: defaultTimeLine,
          impacts: [0, 3, 4, 5, 5, 5],
        },
        {
          id: 4,
          name: "Impact Juri",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 3, 4, 5],
        },
      ],
    }),
    new Activity({
      id: 2,
      name: "Activity 2",
      description: "Activity 2 description",
      owner: "Owner 2",
      status: "Active",
      location: "Location 2",
      RTO: 55556,
      RPO: 5,
      tags: ["tag1", "tag2"],
      createdAt: new Date(),
      updatedAt: new Date(),
      criticality: "Critical",
      validation: "Mr. John Doe",
      volume: "4500 / 5000",
      frequency: "Daily",
      services: [
        {
          id: 1,
          name: "Service 1",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 1, name: "Vendor 1" },
        },
        {
          id: 2,
          name: "Service 2",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 2, name: "Vendor 2" },
        },
        {
          id: 3,
          name: "Service 3",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 3, name: "Vendor 3" },
        },
        {
          id: 4,
          name: "Service 4",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 4, name: "Vendor 4" },
        },
        {
          id: 5,
          name: "Service 5",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 5, name: "Vendor 5" },
        },
      ],
      teams: [
        { id: 1, name: "Team 1" },
        { id: 2, name: "Team 2" },
        { id: 3, name: "Team 3" },
        { id: 4, name: "Team 4" },
        { id: 5, name: "Team 5" },
      ],
      impacts: [
        {
          id: 1,
          name: "Impact 1",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 3, 5, 5],
        },
        {
          id: 2,
          name: "Impact 2",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 3, 5, 5],
        },
        {
          id: 3,
          name: "Impact 3",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 3, 5, 5],
        },
        {
          id: 4,
          name: "Impact 4",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 3, 5, 5],
        },
        {
          id: 5,
          name: "Impact 5",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 3, 5, 5],
        },
      ],
    }),
    new Activity({
      id: 3,
      name: "Activity 3",
      description: "Activity 3 description",
      owner: "Owner 3",
      status: "Active",
      location: "Location 3",
      RTO: 345,
      RPO: 5465,
      tags: ["tag1", "tag2"],
      createdAt: new Date(),
      updatedAt: new Date(),
      criticality: "High",
      validation: "Mr. John Doe",
      volume: "4500 / 5000",
      frequency: "Daily",
      services: [
        {
          id: 1,
          name: "Service 1",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 1, name: "Vendor 1" },
        },
        {
          id: 2,
          name: "Service 2",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 2, name: "Vendor 2" },
        },
        {
          id: 3,
          name: "Service 3",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 3, name: "Vendor 3" },
        },
        {
          id: 4,
          name: "Service 4",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 4, name: "Vendor 4" },
        },
        {
          id: 5,
          name: "Service 5",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 5, name: "Vendor 5" },
        },
      ],
      teams: [
        { id: 1, name: "Team 1" },
        { id: 2, name: "Team 2" },
        { id: 3, name: "Team 3" },
        { id: 4, name: "Team 4" },
        { id: 5, name: "Team 5" },
      ],
      impacts: [
        {
          id: 1,
          name: "Impact 1",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 3, 5, 5],
        },
        {
          id: 2,
          name: "Impact 2",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 3, 5, 5],
        },
        {
          id: 3,
          name: "Impact 3",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 3, 5, 5],
        },
        {
          id: 4,
          name: "Impact 4",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 3, 5, 5],
        },
        {
          id: 5,
          name: "Impact 5",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 3, 5, 5],
        },
      ],
    }),
    new Activity({
      id: 4,
      name: "Activity 4",
      description: "Activity 4 description",
      owner: "Owner 4",
      status: "Active",
      location: "Location 4",
      RTO: 236785,
      RPO: 23456,
      tags: ["tag1", "tag2"],
      createdAt: new Date(),
      updatedAt: new Date(),
      criticality: "High",
      validation: "Mr. John Doe",
      volume: "4500 / 5000",
      frequency: "Daily",
      services: [
        {
          id: 1,
          name: "Service 1",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 1, name: "Vendor 1" },
        },
        {
          id: 2,
          name: "Service 2",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 2, name: "Vendor 2" },
        },
        {
          id: 3,
          name: "Service 3",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 3, name: "Vendor 3" },
        },
        {
          id: 4,
          name: "Service 4",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 4, name: "Vendor 4" },
        },
        {
          id: 5,
          name: "Service 5",
          RTO: 567888,
          RPO: 665,
          vendor: { id: 5, name: "Vendor 5" },
        },
      ],
      teams: [
        { id: 1, name: "Team 1" },
        { id: 2, name: "Team 2" },
        { id: 3, name: "Team 3" },
        { id: 4, name: "Team 4" },
        { id: 5, name: "Team 5" },
      ],
      impacts: [
        {
          id: 1,
          name: "Impact 1",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 2, 2, 2],
        },
        {
          id: 2,
          name: "Impact 2",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 2, 2, 2],
        },
        {
          id: 3,
          name: "Impact 3",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 2, 2, 2],
        },
        {
          id: 4,
          name: "Impact 4",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 2, 2, 2],
        },
        {
          id: 5,
          name: "Impact 5",
          timeline: defaultTimeLine,
          impacts: [0, 1, 2, 2, 2, 2],
        },
      ],
    }),
  ];

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
        type: Types.number,
        field: (data: Activity) => numberSecToTime(data.RTO),
      },
      {
        name: "Recovery Point Objective (seconds)",
        color: "blue",
        type: Types.number,
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
    endpoint: "/activities",
    titleColumn: "Name",
    detailComponent: DetailActivity,
  };

  let createModalState: boolean = false;

  let checkItems: number[] = [];

  let createData: Activity = new Activity({
    id: 0,
    name: "",
    description: "",
    owner: "",
    status: "",
    location: "",
    RTO: 0,
    RPO: 0,
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    criticality: "High",
    validation: "Mr. John Doe",
    volume: "4500 / 5000",
    frequency: "Daily",
    services: [
      {
        id: 1,
        name: "Service 1",
        RTO: 567888,
        RPO: 665,
        vendor: { id: 1, name: "Vendor 1" },
      },
      {
        id: 2,
        name: "Service 2",
        RTO: 567888,
        RPO: 665,
        vendor: { id: 2, name: "Vendor 2" },
      },
      {
        id: 3,
        name: "Service 3",
        RTO: 567888,
        RPO: 665,
        vendor: { id: 3, name: "Vendor 3" },
      },
      {
        id: 4,
        name: "Service 4",
        RTO: 567888,
        RPO: 665,
        vendor: { id: 4, name: "Vendor 4" },
      },
      {
        id: 5,
        name: "Service 5",
        RTO: 567888,
        RPO: 665,
        vendor: { id: 5, name: "Vendor 5" },
      },
    ],
    teams: [
      { id: 1, name: "Team 1" },
      { id: 2, name: "Team 2" },
      { id: 3, name: "Team 3" },
      { id: 4, name: "Team 4" },
      { id: 5, name: "Team 5" },
    ],
    impacts: [
      {
        id: 1,
        name: "Impact 1",
        timeline: defaultTimeLine,
        impacts: [0, 1, 2, 3, 5, 5],
      },
      {
        id: 2,
        name: "Impact 2",
        timeline: defaultTimeLine,
        impacts: [0, 1, 2, 3, 5, 5],
      },
      {
        id: 3,
        name: "Impact 3",
        timeline: defaultTimeLine,
        impacts: [0, 1, 2, 3, 5, 5],
      },
      {
        id: 4,
        name: "Impact 4",
        timeline: defaultTimeLine,
        impacts: [0, 1, 2, 3, 5, 5],
      },
      {
        id: 5,
        name: "Impact 5",
        timeline: defaultTimeLine,
        impacts: [0, 1, 2, 3, 5, 5],
      },
    ],
  });
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
        <Button
          color="green"
          class="mt-2"
          on:click={() => (createModalState = true)}
        >
          <PlusOutline name="add" class="mr-2" /> Add New Activity
        </Button>
        <Button color="light" class="mt-2">
          <DotsVerticalOutline name="dots-vertical" class="" />
        </Button>
      </div>
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
