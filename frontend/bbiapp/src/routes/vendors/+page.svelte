<script lang="ts">
    import CrudTable from "$lib/components/crudTable.svelte";
    import type { Column, TableShape } from "$lib/components/table.types";
    import {numberSecToTime} from "$lib/utils";
    import { Actions, Types } from "$lib/components/table.enums";
    import ModalColumns from "$lib/components/modalColumns.svelte";

    import { Button, Input } from "flowbite-svelte";
    import { PlusOutline } from "flowbite-svelte-icons";

    class Vendor {        
        id: number;
        name: string;
        description: string;
        contact: string;
        status: string;
        tags: string[];
        defaultrto: number;
        defaultrpo: number;
        createdAt: Date;
        updatedAt: Date;

    constructor(id: number, name: string, description: string, contact: string, status: string, tags: string[], defaultrto: number, defaultrpo: number, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.contact = contact;
        this.status = status;
        this.tags = tags;
        this.defaultrto = defaultrto;
        this.defaultrpo = defaultrpo;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    }
    let mockData: Vendor[] = [
        new Vendor(1, 'Vendor 1', 'Vendor 1 description', 'Contact 1', 'Active', ['tag1', 'tag2'], 5678889999, 665, new Date(), new Date()),
        new Vendor(2, 'Vendor 2', 'Vendor 2 description', 'Contact 2', 'Active', ['tag1', 'tag2'], 55556, 5, new Date(), new Date()),
        new Vendor(3, 'Vendor 3', 'Vendor 3 description', 'Contact 3', 'Active', ['tag1', 'tag2'], 55556, 5, new Date(), new Date()),
        new Vendor(4, 'Vendor 4', 'Vendor 4 description', 'Contact 4', 'Active', ['tag1', 'tag2'], 55556, 5, new Date(), new Date()),
        new Vendor(5, 'Vendor 5', 'Vendor 5 description', 'Contact 5', 'Active', ['tag1', 'tag2'], 55556, 5, new Date(), new Date()),
    ];

    let tableShape: TableShape = {
        columns: [
            { name: 'ID', color: 'blue', type: Types.text, field: (data: Vendor) => data.id, formVisible: false },
            { name: 'Name', color: 'blue', type: Types.text, field: (data: Vendor) => data.name },
            { name: 'Description', color: 'blue', type: Types.text, field: (data: Vendor) => data.description, tableVisible: false },
            { name: 'Contact', color: 'blue', type: Types.text, field: (data: Vendor) => data.contact },
            { name: 'Status', color: 'blue', type: Types.text, field: (data: Vendor) => data.status },
            { name: 'Tags', color: 'blue', type: Types.tags, field: (data: Vendor) => data.tags },
            { name: 'Default RTO', color: 'blue', type: Types.number, field: (data: Vendor) => numberSecToTime(data.defaultrto) },
            { name: 'Default RPO', color: 'blue', type: Types.number, field: (data: Vendor) => numberSecToTime(data.defaultrpo) },
            { name: 'Created At', color: 'blue', type: Types.date, field: (data: Vendor) => data.createdAt.toLocaleDateString(), formVisible: false, tableVisible: false },
        ],
        actions: [Actions.edit, Actions.delete],
        endpoint: '/vendors',
        titleColumn: 'Name',
    };

    let createModalState: boolean = false;

    let createData: Vendor = new Vendor(0, '', '', '', '', [], 0, 0, new Date(), new Date());
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