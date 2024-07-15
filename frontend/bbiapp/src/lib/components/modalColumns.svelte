<script lang="ts">
    import { Modal, Button, Input, Label, Badge } from 'flowbite-svelte';

    import type { Data, Column } from './table.types';
    import { Types as TableTypes } from './table.enums';

    export let columns: Column[];
    export let dataToEdit: Data;
    export let title: string;

    export let modalState: boolean;

    // send event to parent component
    export const close = () => {
        modalState = false;
        console.log('close');
    };

</script>

<div class="modal">
        <Modal title="{title}" bind:open={modalState} on:close={close}>
            <form>
                {#each columns as item}
                {#if item.formVisible !== false}
                <div class="mb-4">
                    <Label>{item.name}</Label>
                    {#if item.type === TableTypes.text}
                        <Input bind:value={dataToEdit[item.name.toLowerCase()]} />
                    {/if}
                    {#if item.type === TableTypes.number}
                        <Input type="number" bind:value={dataToEdit[item.name.toLowerCase()]} />
                    {/if}
                    {#if item.type === TableTypes.date}
                        <Input type="date" bind:value={dataToEdit[item.name.toLowerCase()]} />
                    {/if}
                    {#if item.type === TableTypes.tags}
                        <Input bind:value={dataToEdit[item.name.toLowerCase()]} />
                    {/if}
                    {#if item.type === TableTypes.select && item.choices}
                        <select bind:value={dataToEdit[item.name.toLowerCase()]}>
                            {#each item.choices as option}
                                <option value={option.value}>{option.label}</option>
                            {/each}
                        </select>
                    {/if}
                </div>
                {/if}
                {/each}
                <div class="flex justify-end mt-4">
                    <Button color="blue" size="sm">Save</Button>
                </div>
            </form>
        </Modal>
</div>