<script lang="ts">
    import { Sidebar, SidebarWrapper, SidebarItem, SidebarGroup, Button } from 'flowbite-svelte';
    import { BarsOutline, GridSolid, DatabaseSolid, FileChartBarSolid, LayersSolid, StoreSolid, UsersGroupSolid, CashSolid, UserSettingsSolid, CloseOutline } from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let path = '';
    onMount(() => {
        path = window.location.pathname;
        console.log(path);
        
    });

    $: activeUrl = $page.url.pathname;
    $: state = true
  </script>
  
{#if state}
<Sidebar {activeUrl} class="w-48">
  <SidebarWrapper>
    <SidebarGroup>
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-500 dark:text-gray-400">Navigation</h2>
        <Button size="xs" outline round color="none" class="mt-2" on:click={() => state = false}>
          <CloseOutline class="w-6 h-6" />
        </Button>
      </div>
      <SidebarItem label="Dashboard" href="/dashboard">
        <svelte:fragment slot="icon">
          <GridSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Activities" href="/activities">
        <svelte:fragment slot="icon">
          <DatabaseSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Impacts" href="/impacts">
        <svelte:fragment slot="icon">
          <FileChartBarSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Services" href="/services">
        <svelte:fragment slot="icon">
          <LayersSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Vendors" href="/vendors">
        <svelte:fragment slot="icon">
          <StoreSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Teams" href="/teams">
        <svelte:fragment slot="icon">
          <UsersGroupSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
    </SidebarGroup>
    <SidebarGroup border>
      <SidebarItem label="Billing Team" href="/billing/team">
        <svelte:fragment slot="icon">
          <CashSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
      <SidebarItem label="Me" href="/me">
        <svelte:fragment slot="icon">
          <UserSettingsSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        </svelte:fragment>
      </SidebarItem>
    </SidebarGroup>
  </SidebarWrapper>
</Sidebar>
{:else}
<div class="flex justify-center items-center">
  <Button size="xs" outline round  color="dark" class="mt-2" on:click={() => state = true}>
    <BarsOutline class="w-6 h-6" />
  </Button>
</div>
{/if}