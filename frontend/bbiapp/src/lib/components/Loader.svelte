<script lang="ts">
  import { Spinner, Button } from "flowbite-svelte";

  export const loaderSize: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" = "md";
  export let message: string = "Loading ...";
  export let dark: boolean = false;

  const translateSize = (size: string) => {
    switch (size) {
      case "xs":
        return 1;
      case "sm":
        return 6;
      case "md":
        return 8;
      case "lg":
        return 10;
      case "xl":
        return 12;
      case "2xl":
        return 16;
      default:
        return 8;
    }
  };

  $: spinnerSize = translateSize(loaderSize);
</script>

<div class="flex flex-wrap items-center gap-2">
  <Button>
    <Spinner class="me-3" size={spinnerSize} color="blue" />
    <p class="text-sm font-semibold text-{dark ? 'white' : 'gray-500'}">
      {message}
    </p>
  </Button>
</div>
