<script lang="ts">
  import { Modal, Button, Input, Label, Badge } from "flowbite-svelte";

  import type { Data, Column } from "./table.types";
  import { Types as TableTypes } from "./table.enums";

  import { patchData, type IResponse } from "$lib/auth";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let columns: Column[];
  export let dataToEdit: Data;
  export let title: string;
  export let endpoint: string;
  export let id: number;

  export let modalState: boolean;

  export const close = () => {
    modalState = false;
  };

  $: loading = false;

  // contenate text and remove spaces, lowercase
  const slugify = (item: Column) => {
    if (item.fieldName) return item.fieldName;
    return item.name
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "");
  };

  async function save() {
    loading = true;
    
    const response: IResponse | void = await patchData(endpoint, id, dataToEdit);
    loading = false;
    if (!response) return;
    if (response.json) {
      close();
      dispatch("save", response.json);
    }
  }
  $: { 
    console.log("dataToEdit", dataToEdit);
  }
</script>

<div class="modal">
  <Modal {title} bind:open={modalState} on:close={close}>
    <form on:submit|preventDefault={save}>
      {#each columns as item}
        {#if item.formVisible !== false}
          <div class="mb-4">
            <Label>{item.name}</Label>
            {#if item.type === TableTypes.text}
              <Input bind:value={dataToEdit[slugify(item)]} />
            {/if}
            {#if item.type === TableTypes.number}
              <Input type="number" bind:value={dataToEdit[slugify(item)]} />
            {/if}
            {#if item.type === TableTypes.date}
              <Input type="date" bind:value={dataToEdit[slugify(item)]} />
            {/if}
            {#if item.type === TableTypes.tags}
              <Input bind:value={dataToEdit[slugify(item)]} />
            {/if}
            {#if item.type === TableTypes.select && item.choices}
              <select bind:value={dataToEdit[slugify(item)]}>
                {#each item.choices as option}
                  <option value={option.value}>{option.label}</option>
                {/each}
              </select>
            {/if}
          </div>
        {/if}
      {/each}
      <div class="flex justify-end mt-4">
        <Button color="blue" size="sm" type="submit" disabled={loading}>
          Save
        </Button>
      </div>
    </form>
  </Modal>
</div>
