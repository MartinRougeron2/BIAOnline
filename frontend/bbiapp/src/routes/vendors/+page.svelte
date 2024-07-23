<script lang="ts">
    import { Vendor } from "$lib/types/class/entities";
    import CrudTable from "$lib/components/crudTable.svelte";
    import type { Column, TableShape } from "$lib/components/table.types";
    import {numberSecToTime} from "$lib/utils";
    import { Actions, Types } from "$lib/components/table.enums";
    import ModalColumns from "$lib/components/modalColumns.svelte";

    import { Button, Input } from "flowbite-svelte";
    import { PlusOutline } from "flowbite-svelte-icons";


    let mockData: Vendor[] = [
        new Vendor(
            { id: 1, name: 'Vendor 1', description: 'Vendor 1 description', contact: 'Contact 1', status: 'Active', tags: ['tag1', 'tag2'], defaultRTO: 5678889999, defaultRPO: 665, createdAt: new Date(), updatedAt: new Date() }
        ),
        new Vendor(
            { id: 2, name: 'Vendor 2', description: 'Vendor 2 description', contact: 'Contact 2', status: 'Active', tags: ['tag1', 'tag2'], defaultRTO: 55556, defaultRPO: 5, createdAt: new Date(), updatedAt: new Date() }
        ),
        new Vendor(
            { id: 3, name: 'Vendor 3', description: 'Vendor 3 description', contact: 'Contact 3', status: 'Active', tags: ['tag1', 'tag2'], defaultRTO: 345, defaultRPO: 5465, createdAt: new Date(), updatedAt: new Date() }
        ),
        new Vendor(
            { id: 4, name: 'Vendor 4', description: 'Vendor 4 description', contact: 'Contact 4', status: 'Active', tags: ['tag1', 'tag2'], defaultRTO: 236785, defaultRPO: 234567875, createdAt: new Date(), updatedAt: new Date() }
        ),
        new Vendor(
            { id: 5, name: 'Vendor 5', description: 'Vendor 5 description', contact: 'Contact 5', status: 'Active', tags: ['tag1', 'tag2'], defaultRTO: 5678905, defaultRPO: 4565, createdAt: new Date(), updatedAt: new Date() }
        ),
    ];

    let tableShape: TableShape = {
        columns: [
            { name: 'ID', color: 'blue', type: Types.text, field: (data: Vendor) => data.id, formVisible: false },
            { name: 'Name', color: 'blue', type: Types.text, field: (data: Vendor) => data.name },
            { name: 'Description', color: 'blue', type: Types.text, field: (data: Vendor) => data.description, tableVisible: false },
            { name: 'Contact', color: 'blue', type: Types.text, field: (data: Vendor) => data.contact },
            { name: 'Status', color: 'blue', type: Types.text, field: (data: Vendor) => data.status },
            { name: 'Tags', color: 'blue', type: Types.tags, field: (data: Vendor) => data.tags },
            { name: 'Default RTO', color: 'blue', type: Types.number, field: (data: Vendor) => numberSecToTime(data.defaultRTO), fieldName: 'defaultRTO' },
            { name: 'Default RPO', color: 'blue', type: Types.number, field: (data: Vendor) => numberSecToTime(data.defaultRPO), fieldName: 'defaultRPO' },
            { name: 'Created At', color: 'blue', type: Types.date, field: (data: Vendor) => data.createdAt.toLocaleDateString(), formVisible: false, tableVisible: false },
        ],
        actions: [Actions.edit, Actions.delete],
        endpoint: '/vendors',
        titleColumn: 'Name',
    };

    let createModalState: boolean = false;

    let createData: Vendor = new Vendor(
        { id: 0, name: '', description: '', contact: '', status: '', tags: [], defaultRTO: 0, defaultRPO: 0, createdAt: new Date(), updatedAt: new Date() }
    );

    let checkItems: number[] = [];
</script>
<main>
    <div class="vendors">
        <p class="text-2xl font-bold">
            Vendors
        </p>
        <div class="flex justify-between">
            <Input type="text" id="search-table" placeholder="Search In The Table" class="mt-2" defaultClass="w-64" />
            
            <Button color="green" class="mt-2" on:click={() => createModalState = true}>
                <PlusOutline name="add" class="mr-2" /> Add New Vendor
            </Button>
        </div>
        
        <CrudTable TableShape={tableShape} TableData={mockData} bind:checkItems={checkItems} />

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