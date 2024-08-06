<script lang="ts">
  import {
    Modal,
    Button,
    Input,
    Label,
    Badge,
    Indicator,
  } from "flowbite-svelte";

  import type { Data, Column } from "./table.types";
  import { Types as TableTypes } from "./table.enums";

  import { patchData, postData, type IResponse } from "$lib/auth";
  import { createEventDispatcher } from "svelte";
  import { numberSecToTime } from "$lib/utils";
  import InterfaceInput from "./interfaceInput.svelte";

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
    if (id === 0) {
      const response: IResponse | void = await postData(endpoint, dataToEdit);
      loading = false;
      if (!response) return;
      if (response.json) {
        close();
        dispatch("save", response.json);
      }
      return; // else
    }
    const response: IResponse | void = await patchData(
      endpoint,
      id,
      dataToEdit,
    );
    loading = false;
    if (!response) return;
    if (response.json) {
      close();
      dispatch("save", response.json);
    }
  }

  function secondsToUnits(
    seconds: number,
    unit: "year" | "month" | "day" | "hour" | "minute" | "seconds",
  ) {
    switch (unit) {
      case "year":
        return Math.floor(seconds / 31536000);
      case "month":
        return Math.floor((seconds % 31536000) / 2592000);
      case "day":
        return Math.floor((seconds % 2592000) / 86400);
      case "hour":
        return Math.floor((seconds % 86400) / 3600);
      case "minute":
        return Math.floor((seconds % 3600) / 60);
      case "seconds":
        return Math.floor(seconds % 60);
      default:
        return seconds;
    }
  }

  function addUnit(
    seconds: number,
    data: string,
    unit: "year" | "month" | "day" | "hour" | "minute" | "seconds",
  ) {
    const map = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
      seconds: 1,
    };
    // remove old unit and add new unit
    const old = secondsToUnits(seconds, unit);
    const oldSeconds = old * map[unit];
    const newSeconds = +data * map[unit];
    return seconds - oldSeconds + newSeconds;
  }
</script>

<div class="modal">
  <Modal {title} bind:open={modalState} on:close={close}>
    <form on:submit|preventDefault={save}>
      {#each columns as item}
        {#if item.formVisible !== false}
          <div class="mb-4">
            <div class="flex justify-between">
              <Label>
                {item.name}
                {#if item.type === TableTypes.tags}
                  <Badge color="blue">Comma separated</Badge>
                {/if}
              </Label>
            </div>
            {#if item.type === TableTypes.text}
              <Input bind:value={dataToEdit[slugify(item)]} />
            {/if}
            {#if item.type === TableTypes.time}
              <!-- if seconds > year, display input to enter years -->
              <div class="flex items-center">
                <InterfaceInput
                  type="number"
                  on:newValue={(data) => {
                    dataToEdit[slugify(item)] = addUnit(
                      dataToEdit[slugify(item)],
                      data.detail,
                      "month",
                    );
                  }}
                  data={secondsToUnits(dataToEdit[slugify(item)], "month")}
                  classInput="w-1/3"
                />
                <span class="mx-2">months</span>
                <InterfaceInput
                  type="number"
                  on:newValue={(data) => {
                    dataToEdit[slugify(item)] = addUnit(
                      dataToEdit[slugify(item)],
                      data.detail,
                      "day",
                    );
                  }}
                  data={secondsToUnits(dataToEdit[slugify(item)], "day")}
                  classInput="w-1/3"
                />
                <span class="mx-2">days</span>
                <InterfaceInput
                  type="number"
                  on:newValue={(data) => {
                    dataToEdit[slugify(item)] = addUnit(
                      dataToEdit[slugify(item)],
                      data.detail,
                      "hour",
                    );
                  }}
                  data={secondsToUnits(dataToEdit[slugify(item)], "hour")}
                  classInput="w-1/3"
                />
                <span class="mx-2">hours</span>
                <InterfaceInput
                  type="number"
                  on:newValue={(data) => {
                    dataToEdit[slugify(item)] = addUnit(
                      dataToEdit[slugify(item)],
                      data.detail,
                      "minute",
                    );
                  }}
                  data={secondsToUnits(dataToEdit[slugify(item)], "minute")}
                  classInput="w-1/3"
                />
                <span class="mx-2">minutes</span>
                <InterfaceInput
                  type="number"
                  on:newValue={(data) => {
                    dataToEdit[slugify(item)] = addUnit(
                      dataToEdit[slugify(item)],
                      data.detail,
                      "seconds",
                    );
                  }}
                  data={secondsToUnits(dataToEdit[slugify(item)], "seconds")}
                  classInput="w-1/3"
                />
                <span class="mx-2">seconds</span>
              </div>
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
