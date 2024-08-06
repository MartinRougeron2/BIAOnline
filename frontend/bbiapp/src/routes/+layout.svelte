<script lang="ts">
  import {
    CheckCircleSolid,
    ExclamationCircleSolid,
  } from "flowbite-svelte-icons";

  import { page } from "$app/stores";

  import Header from "./Header.svelte";
  import Sidebar from "./Sidebar.svelte";
  import { Toast } from "flowbite-svelte";

  import "../app.css";
  import { notificationStore, type INotificationStore } from "../lib/stores";

  let toasts: INotificationStore[] = [];

  notificationStore.subscribe((value) => {
    toasts = value;
  });

  function getTitle(pathname: string) {
    let baseName = "BBIA | ";

    switch (pathname) {
      case "/":
        return baseName + "Home";
      case "/dashboard":
        return baseName + "Dashboard";
      case "/services":
        return baseName + "Services";
      case "/teams":
        return baseName + "Teams";
      case "/vendors":
        return baseName + "Vendors";
      case "/activities":
        return baseName + "Activities";
      case "/users":
        return baseName + "Users";
      case "/settings":
        return baseName + "Settings";
      default:
        return baseName + "Page not found";
    }
  }

  $: title = getTitle($page.url.pathname);

  $: printer = $page.url.pathname.includes("print");
</script>

<title>{title}</title>

<div class="app">
  {#if printer}
    <div class="print">
      <slot></slot>
    </div>
  {:else}
    <div>
      <div class="header pt-2 bg-gray-100">
        <Header></Header>
      </div>
      <div class="view h-full">
        <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div class="p-2">
            <Sidebar></Sidebar>
          </div>
          <main class="col-span-5 p-2">
            <slot></slot>
          </main>
        </div>
      </div>
      <div>
        <div class="notification">
          {#each toasts as toast, index}
            {#if toast.type === "success"}
              <Toast
                color="green"
                show={toast.show}
                style="transition: all 0.5s ease; transform: translateY({index *
                  10}%)"
                on:close={() => notificationStore.remove(toast.id)}
              >
                <svelte:fragment slot="icon">
                  <CheckCircleSolid class="w-5 h-5" />
                  <span class="sr-only">Check icon</span>
                </svelte:fragment>
                <!-- <span>{toast.message}</span> -->
                {@html toast.message}
              </Toast>
            {:else if toast.type === "error"}
              <Toast
                color="red"
                show={toast.show}
                style="transition: all 0.5s ease; transform: translateY({index *
                  10}%)"
                on:close={() => notificationStore.remove(toast.id)}
              >
                <svelte:fragment slot="icon">
                  <ExclamationCircleSolid class="w-5 h-5" />
                  <span class="sr-only">Warning icon</span>
                </svelte:fragment>
                <!-- <span>{toast.message}</span> -->
                {@html toast.message}
              </Toast>
            {/if}
          {/each}
        </div>
      </div>
    </div>

    <footer class="bg-gray-800 text-white">contact</footer>
  {/if}
</div>

<style>
  .header {
    min-height: 80px;
  }
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .notification {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 9999;
  }

  main {
    min-height: calc(100vh - 80px - 60px);
  }

  footer {
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: self-start;
    padding: 12px;
    min-height: 60px;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
