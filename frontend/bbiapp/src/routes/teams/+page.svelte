<script lang="ts">
    import CrudTable from "$lib/components/crudTable.svelte";
    import type { Column, TableShape } from "$lib/components/table.types";
    import { Actions, Types } from "$lib/components/table.enums";
    import ModalColumns from "$lib/components/modalColumns.svelte";

    import { Button, Input } from "flowbite-svelte";
    import { PlusOutline } from "flowbite-svelte-icons";

    class Team {        
        id: number;
        name: string;
        description: string;
        owner: string;
        status: string;
        membersnumber: number;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;

        constructor(id: number, name: string, description: string, owner: string, status: string, membersnumber: number, tags: string[], createdAt: Date, updatedAt: Date) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.owner = owner;
            this.status = status;
            this.membersnumber = membersnumber;
            this.tags = tags;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
    }
    let mockData: Team[] = [
        new Team(1, 'Team 1', 'Team 1 description', 'Owner 1', 'Active', 5, ['tag1', 'tag2'], new Date(), new Date()),
        new Team(2, 'Team 2', 'Team 2 description', 'Owner 2', 'Active', 5, ['tag1', 'tag2'], new Date(), new Date()),
        new Team(3, 'Team 3', 'Team 3 description', 'Owner 3', 'Active', 5, ['tag1', 'tag2'], new Date(), new Date()),
        new Team(4, 'Team 4', 'Team 4 description', 'Owner 4', 'Active', 5, ['tag1', 'tag2'], new Date(), new Date()),
        new Team(5, 'Team 5', 'Team 5 description', 'Owner 5', 'Active', 5, ['tag1', 'tag2'], new Date(), new Date()),
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

    let createData: Team = new Team(0, '', '', '', '', 0, [], new Date(), new Date());
</script>
<main>
    <div class="vendors">
        <p class="text-2xl font-bold">
            Teams
        </p>
        <div class="flex justify-between">
            <Input type="text" id="search-table" placeholder="Search In The Table" class="mt-2" defaultClass="w-64" />
            
            <Button color="green" class="mt-2" on:click={() => createModalState = true}>
                <PlusOutline name="add" class="mr-2" /> Add New Team
            </Button>
        </div>
        
        <CrudTable TableShape={tableShape} TableData={mockData} />

        <ModalColumns columns={tableShape.columns.slice(1)} dataToEdit={createData} title="Create New Team" modalState={createModalState} />
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