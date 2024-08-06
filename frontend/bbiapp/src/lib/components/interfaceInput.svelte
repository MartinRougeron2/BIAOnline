<script lang="ts">
  import { Input, type InputType } from "flowbite-svelte";
  import { createEventDispatcher } from "svelte";

  export let data;
  export let type: InputType = "text";
  export let classInput = "";

  const dispatch = createEventDispatcher();

  // send the value to the parent component on input event
  function valueChanged() {
    // send the value to the parent component
    dispatch("newValue", value);
  }
  // value is a copy of the value of data
  let value = data;
</script>

<Input bind:value {type} on:change={valueChanged} class={classInput} />
