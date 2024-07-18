<script lang="ts">
  import {
    Checkbox,
    Listgroup,
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
  import ViewImpact from "./viewImpact.svelte";
  import type { ImpactType } from "./impactEvaulation.types";
  import type { ImpactEntity } from "$lib/types/entities/impact.entity";
  import ViewMaxImpact from "./viewMaxImpact.svelte";
  import { onMount, type ComponentType } from "svelte";

  export let TableShape: TableShape;
  export let TableData: Data[];

  let searchValue = "";

  type State = Actions | null;
  let state: State = null;
  let modalState: boolean = false;
  let indexSelected: number = 0;
  let colorVarients = ["blue", "green", "red", "yellow", "purple", "pink"];

  $: dataEdit = TableData[indexSelected];
  // $: dataEditTitle = TableShape.titleColumn;
  $: dataEditTitle = dataEdit[TableShape.titleColumn.toLowerCase()];


  function impactsTimelineToImpactType(impactE: ImpactEntity, max: number): ImpactType {
    return {
      name: "Impacts",
        impacts: impactE.impacts.map((impact, index) => {
            return {
            time: impactE.timeline[index],
            impactSize: impact,
            };
        }),
      scaleMin: 0,
      scaleMax: max,
      colors: ["#FF0000", "#00FF00"],
    };
  }

   function maxImpact(impacts: ImpactType[]) {
    return {
         name: '',
         impacts: impacts[0].impacts.map((impact, index) => {
             let max = 0;
             impacts.forEach(impact => {
                 if (impact.impacts[index].impactSize > max) {
                     max = impact.impacts[index].impactSize;
                 }
             });
             return {
                 time: impact.time,
                 impactSize: max
             }
         }),
         scaleMin: impacts[0].scaleMin,
         scaleMax: impacts[0].scaleMax,
         colors: impacts[0].colors
     } as ImpactType;
    }

  let checkItems: boolean[] = Array(TableData.length).fill(false);

  let openRow: number | null = null;

  const toggleRow = (i: number) => {
    openRow = openRow === i ? null : i;
  };

  $: maxImpacts = TableData.map((item) => {
    return TableShape.columns
        .filter((column) => column.type === Types.impact)
        .map((column) => column.field(item).map((impactE: ImpactEntity) => {
            return Math.max(...impactE.impacts);
        })).flat()
    }).flat();

    $: maxImpactSize = Math.max(...maxImpacts);

</script>

<div class="CRUDTable">
  <Table striped>
    <TableHead>
      <TableHeadCell class="py-4">
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
          <TableHeadCell class="text-{item.position ?? "center"}">{item.name}</TableHeadCell>
        {/if}
      {/each}
      <TableHeadCell>Actions</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each TableData as item, index}
        <TableBodyRow on:click={() => toggleRow(index)}>
          <TableBodyCell class="py-4">
            <Checkbox
              on:change={() => (checkItems[index] = !checkItems[index])}
              checked={checkItems[index]}
              on:click={(e) => e.stopPropagation()}
            />
          </TableBodyCell>
          {#each TableShape.columns as column}
            {#if column.tableVisible !== false}
              <TableBodyCell class="py-4 px-1 text-{column.position ?? "center"}">
                {#if column.type === Types.tags}
                  {#each column.field(item) as tag}
                    <Badge rounded color="blue" class="mt-1">{tag}</Badge><br />
                  {/each}
                {:else if column.type === Types.list}
                    {#each column.field(item) as val, indexList}
                      <!-- {val} -->
                      {#if indexList % 2 === 0 && indexList !== 0}
                        <br />
                      {/if}
                        <Badge rounded color="{colorVarients[indexList % colorVarients.length]}" class="ml-1">{val}</Badge>
                    {/each}
                {:else if column.type === Types.impact}
                    <ViewImpact impact={maxImpact(
                        column.field(item).map(impactE => impactsTimelineToImpactType(impactE, maxImpactSize)))} heightCanvas={100} noname={true} />
                {:else if column.type === Types.criticality}
                    {#if column.field(item) === "Critical"}
                      <Badge rounded color="red" class="ml-1">Critical</Badge>
                    {:else if column.field(item) === "High"}
                      <Badge rounded color="yellow" class="ml-1">High</Badge>
                    {:else if column.field(item) === "Medium"}
                      <Badge rounded color="green" class="ml-1">Medium</Badge>
                    {:else if column.field(item) === "Low"}
                      <Badge rounded color="blue" class="ml-1">Low</Badge>
                    {/if}
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
            {#if TableShape.detailComponent}
                <svelte:component this={TableShape.detailComponent} {item} />
            {:else}
                <div>
                    <p>Detail</p>
                </div>
            {/if}
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
