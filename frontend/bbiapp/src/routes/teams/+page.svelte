<script lang="ts">
    import CrudTable from "$lib/components/crudTable.svelte";
    import type { Column, TableShape } from "$lib/components/table.types";
    import { Actions, Types } from "$lib/components/table.enums";
    import ModalColumns from "$lib/components/modalColumns.svelte";

    import { Button, Input } from "flowbite-svelte";
    import { PlusOutline } from "flowbite-svelte-icons";
    import  { Team } from "$lib/types/class/entities";


    let mockData: Team[] = [
        new Team({ id: 1, name: 'Team 1', description: 'Team 1 description', owner: 'Owner 1', status: 'Active', membersnumber: 5, tags: ['tag1', 'tag2'], createdAt: new Date(), updatedAt: new Date() }),
        new Team({ id: 2, name: 'Team 2', description: 'Team 2 description', owner: 'Owner 2', status: 'Active', membersnumber: 5, tags: ['tag1', 'tag2'], createdAt: new Date(), updatedAt: new Date() }),
        new Team({ id: 3, name: 'Team 3', description: 'Team 3 description', owner: 'Owner 3', status: 'Active', membersnumber: 5, tags: ['tag1', 'tag2'], createdAt: new Date(), updatedAt: new Date() }),
        new Team({ id: 4, name: 'Team 4', description: 'Team 4 description', owner: 'Owner 4', status: 'Active', membersnumber: 5, tags: ['tag1', 'tag2'], createdAt: new Date(), updatedAt: new Date() }),
        new Team({ id: 5, name: 'Team 5', description: 'Team 5 description', owner: 'Owner 5', status: 'Active', membersnumber: 5, tags: ['tag1', 'tag2'], createdAt: new Date(), updatedAt: new Date() }),
    ];

    let tableShape: TableShape = {
        columns: [
            { name: 'ID', color: 'blue', type: Types.text, field: (data: Team) => data.id },
            { name: 'Name', color: 'blue', type: Types.text, field: (data: Team) => data.name },
            { name: 'Description', color: 'blue', type: Types.text, field: (data: Team) => data.description },
            { name: 'Owner', color: 'blue', type: Types.text, field: (data: Team) => data.owner },
            { name: 'Status', color: 'blue', type: Types.text, field: (data: Team) => data.status },
            { name: 'Members Number', color: 'blue', type: Types.number, field: (data: Team) => data.membersnumber },
            { name: 'Tags', color: 'blue', type: Types.tags, field: (data: Team) => data.tags },
            { name: 'Created At', color: 'blue', type: Types.date, field: (data: Team) => data.createdAt.toLocaleDateString() },
        ],
        actions: [Actions.edit, Actions.delete],
        endpoint: '/teams',
        titleColumn: 'Name',
    };

    let createModalState: boolean = false;

    let createData: Team = new Team({ id: 0, name: '', description: '', owner: '', status: '', membersnumber: 0, tags: [], createdAt: new Date(), updatedAt: new Date() });

    let checkItems: number[] = [];

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

    <CrudTable TableShape={tableShape} TableData={mockData} bind:checkItems={checkItems} />

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
