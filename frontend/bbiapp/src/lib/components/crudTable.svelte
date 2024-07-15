<script lang="ts">
  import {
    Checkbox,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { Modal, Button, Badge } from "flowbite-svelte";


  import type { Data, TableShape } from "./table.types";
  import { Actions, Types } from "./table.enums";
  import { TrashBinSolid } from "flowbite-svelte-icons";
  import ModalColumns from "./modalColumns.svelte";

  export let TableShape: TableShape;
  export let TableData: Data[];

  let searchValue = "";

  type State = Actions | null;
  let state: State = null;
  let modalState: boolean = false;
  let indexSelected: number = 0;

  $: dataEdit = TableData[indexSelected];
  // $: dataEditTitle = TableShape.titleColumn;
  $: dataEditTitle = dataEdit[TableShape.titleColumn.toLowerCase()];

  let checkItems: boolean[] = Array(TableData.length).fill(false);

  let openRow: number | null = null;

  const toggleRow = (i: number) => {
    openRow = openRow === i ? null : i;
  };
</script>

<div class="CRUDTable">
  <Table striped hoverable>
    <TableHead>
      <TableHeadCell class="!p-4">
        <Checkbox
          on:change={() =>
            (checkItems = checkItems.every((item) => item)
              ? TableData.map(() => false)
              : TableData.map(() => true))}
          checked={checkItems.every((item) => item)}
        />
      </TableHeadCell>
      {#each TableShape.columns as item}
        {#if item.tableVisible !== false}
          <TableHeadCell>{item.name}</TableHeadCell>
        {/if}
      {/each}
      <TableHeadCell>Actions</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each TableData as item, index}
        <TableBodyRow on:click={() => toggleRow(index)}>
          <TableBodyCell class="!p-4">
            <Checkbox
              on:change={() => (checkItems[index] = !checkItems[index])}
              checked={checkItems[index]}
              on:click={(e) => e.stopPropagation()}
            />
          </TableBodyCell>
          {#each TableShape.columns as column}
            {#if column.tableVisible !== false}
              <TableBodyCell>
                {#if column.type === Types.tags}
                  {#each column.field(item) as tag}
                    <Badge rounded color="blue" class="ml-1">{tag}</Badge>
                  {/each}
                {:else}
                  {column.field(item)}
                {/if}
              </TableBodyCell>
            {/if}
          {/each}
          <TableBodyCell>
            <Button
              color="blue"
              size="sm"
              on:click={(e) => {
                indexSelected = index;
                modalState = true;
                state = Actions.edit;
                e.stopPropagation();
              }}>Edit</Button
            >
            <Button
              color="red"
              size="sm"
              on:click={(e) => {
                indexSelected = index;
                modalState = true;
                state = Actions.delete;
                e.stopPropagation();
              }}
            >
              &nbsp;
              <TrashBinSolid />
            </Button>
          </TableBodyCell>
        </TableBodyRow>
        {#if openRow === index}
          <TableBodyRow on:dblclick={() => {}}>
            <TableBodyCell colspan={TableShape.columns.length + 2}>
              <div class="p-4 bg-white">
                <ul>
                  {#each Object.entries(item) as [key, value]}
                    <li>{key}: {value}</li>
                  {/each}
              </div>
            </TableBodyCell>
          </TableBodyRow>
        {/if}
      {/each}
    </TableBody>
  </Table>
  {#if state === Actions.edit}
    <ModalColumns
      columns={TableShape.columns}
      dataToEdit={dataEdit}
      title="Edit {dataEditTitle}"
    bind:modalState={modalState}
    />
  {/if}
  {#if state === Actions.delete}
    <Modal
      title="Delete {dataEditTitle}"
      on:close={() => (state = null)}
      bind:open={modalState}
    >
      <div class="grid grid-cols-1 gap-4">
        <span
          >Are you sure you want to delete <strong>{dataEditTitle}</strong
          >?</span
        >
        <div class="flex justify-between mt-4">
          <Button color="blue" size="sm" on:click={() => (state = null)}
            >No</Button
          >
          <Button
            color="red"
            size="sm"
            class="mr-2"
            on:click={() => (state = null)}>Yes</Button
          >
        </div>
      </div>
    </Modal>
  {/if}
</div>

<style>
  .CRUDTable {
    margin-top: 1rem;
    background-color: rgb(190, 190, 190);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border: 1px solid rgb(156, 156, 156);
  }
  td:last-child {
    background-color: royalblue;
  }
</style>
