<script lang="ts">
    import { Sidebar, SidebarWrapper, SidebarItem, SidebarGroup } from 'flowbite-svelte';
    import { GridSolid, DatabaseSolid, FileChartBarSolid, LayersSolid, StoreSolid, UsersGroupSolid, CashSolid, UserSettingsSolid } from 'flowbite-svelte-icons';
    import { onMount } from 'svelte';

    let path = '';
    onMount(() => {
        path = window.location.pathname;
        console.log(path);
        
    });
    const activeLinkClass = (link: string) => {
      console.log(link);
      
        return path === link ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : '';
    };
  </script>
  
  <Sidebar>
    <SidebarWrapper>
      <SidebarGroup>
        <SidebarItem label="Dashboard" href="/dashboard" activeClass={activeLinkClass('/dashboard')}>
          <svelte:fragment slot="icon">
            <GridSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Activities" href="/activities" activeClass={activeLinkClass('/activities')}>
          <svelte:fragment slot="icon">
            <DatabaseSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Impacts" href="/impacts" activeClass={activeLinkClass('/impacts')}>
          <svelte:fragment slot="icon">
            <FileChartBarSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Services" href="/services" activeClass={activeLinkClass('/services')}>
          <svelte:fragment slot="icon">
            <LayersSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Vendors" href="/vendors" activeClass={activeLinkClass('/vendors')}>
          <svelte:fragment slot="icon">
            <StoreSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Teams" href="/teams" activeClass={activeLinkClass('/teams')}>
          <svelte:fragment slot="icon">
            <UsersGroupSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
      <SidebarGroup border>
        <SidebarItem label="Billing Team" href="/billing/team" activeClass={activeLinkClass('/billing/team')}>
          <svelte:fragment slot="icon">
            <CashSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
        <SidebarItem label="Me" href="/me" class={activeLinkClass('/me')}>
          <svelte:fragment slot="icon">
            <UserSettingsSolid class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          </svelte:fragment>
        </SidebarItem>
      </SidebarGroup>
    </SidebarWrapper>
  </Sidebar>