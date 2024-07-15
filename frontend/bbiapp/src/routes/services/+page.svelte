<script lang="ts">
    import CrudTable from "$lib/components/crudTable.svelte";
    import type { Column, TableShape } from "$lib/components/table.types";
    import { Actions, Types } from "$lib/components/table.enums";
    import ModalColumns from "$lib/components/modalColumns.svelte";

    import { Button, Input } from "flowbite-svelte";
    import { PlusOutline } from "flowbite-svelte-icons";
  import { numberSecToTime } from "$lib/utils";

    class Service {
        id: number;
        name: string;
        description: string;
        owner: string;
        status: string;
        location: string;
        rto: number;
        rpo: number;
        vendorId: number;
        vendorName: string;
        tags: string[];
        createdAt: Date;
        updatedAt: Date;


        constructor(id: number, name: string, description: string, owner: string, status: string, location: string, rto: number, rpo: number, vendorName: string, vendorId: number, tags: string[], createdAt: Date, updatedAt: Date) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.owner = owner;
            this.status = status;
            this.location = location;
            this.rto = rto;
            this.rpo = rpo;
            this.vendorName = vendorName;
            this.vendorId = vendorId;
            this.tags = tags;
            this.createdAt = createdAt;
            this.updatedAt = updatedAt;
        }
    }
    let mockData: Service[] = [
        new Service(1, 'Service 1', 'Service 1 description', 'Owner 1', 'Active', 'Location 1', 5678889999, 665, 'Vendor 1', 1, ['tag1', 'tag2'], new Date(), new Date()),
        new Service(2, 'Service 2', 'Service 2 description', 'Owner 2', 'Active', 'Location 2', 55556, 5, 'Vendor 2', 2, ['tag1', 'tag2'], new Date(), new Date()),
        new Service(3, 'Service 3', 'Service 3 description', 'Owner 3', 'Active', 'Location 3', 345, 5465, 'Vendor 3', 3, ['tag1', 'tag2'], new Date(), new Date()),
        new Service(4, 'Service 4', 'Service 4 description', 'Owner 4', 'Active', 'Location 4', 236785, 234567875, 'Vendor 4', 4, ['tag1', 'tag2'], new Date(), new Date()),
        new Service(5, 'Service 5', 'Service 5 description', 'Owner 5', 'Active', 'Location 5', 5678905, 4565, 'Vendor 5', 5, ['tag1', 'tag2'], new Date(), new Date()),
    ];

    let tableShape: TableShape = {
        columns: [
            { name: 'ID', color: 'blue', type: Types.text, field: (data: Service) => data.id, formVisible: false },
            { name: 'Name', color: 'blue', type: Types.text, field: (data: Service) => data.name },
            { name: 'Description', color: 'blue', type: Types.text, field: (data: Service) => data.description, tableVisible: false },
            { name: 'Owner', color: 'blue', type: Types.text, field: (data: Service) => data.owner, tableVisible: false },
            { name: 'Status', color: 'blue', type: Types.text, field: (data: Service) => data.status, tableVisible: false },
            { name: 'Location', color: 'blue', type: Types.text, field: (data: Service) => data.location },
            { name: 'rto', color: 'blue', type: Types.number, field: (data: Service) => numberSecToTime(data.rto) },
            { name: 'rpo', color: 'blue', type: Types.number, field: (data: Service) => numberSecToTime(data.rpo) },
            { name: 'Vendor Name', color: 'blue', type: Types.select, field: (data: Service) => data.vendorName,  fieldName: 'vendorId',
                choices: [{ value: 1, label: 'Vendor 1' }, { value: 2, label: 'Vendor 2' }, { value: 3, label: 'Vendor 3' }, { value: 4, label: 'Vendor 4' }, { value: 5, label: 'Vendor 5' }] 
            },
            { name: 'Tags', color: 'blue', type: Types.tags, field: (data: Service) => data.tags },
            { name: 'Created At', color: 'blue', type: Types.date, field: (data: Service) => data.createdAt.toLocaleDateString(), formVisible: false, tableVisible: false },
        ],
        actions: [Actions.edit, Actions.delete],
        endpoint: '/services',
        titleColumn: 'Name',
    };

    let createModalState: boolean = false;

    let createData: Service = new Service(0, '', '', '', '', '', 0, 0, '', 1, [], new Date(), new Date());
</script>
<main>
    <div class="vendors">
        <p class="text-2xl font-bold">
            Services
        </p>
        <div class="flex justify-between">
            <Input type="text" id="search-table" placeholder="Search In The Table" class="mt-2" defaultClass="w-64" />
            
            <Button color="green" class="mt-2" on:click={() => createModalState = true}>
                <PlusOutline name="add" class="mr-2" /> Add New Service
            </Button>
        </div>
        
        <CrudTable TableShape={tableShape} TableData={mockData} />

        <ModalColumns columns={tableShape.columns} dataToEdit={createData} title="Create New Service" modalState={createModalState} />
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