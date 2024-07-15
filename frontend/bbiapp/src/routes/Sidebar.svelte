<script>
    import { Sidebar, SidebarWrapper, SidebarItem, SidebarGroup } from 'flowbite-svelte';
    import { GridSolid, DatabaseSolid, FileChartBarSolid, LayersSolid, StoreSolid, UsersGroupSolid, CashSolid, UserSettingsSolid } from 'flowbite-svelte-icons';
    let spanClass = 'flex-1 ms-3 whitespace-nowrap';

    // pages
    // dashbaord => grid
    // actvities => database
    // impacts => filechartbar
    // services => layers
    // vendors => store
    // teams => usersgroup
    // ==
    // Billing Team => cash
    // Account => usersettings

  </script>
  
  <Sidebar>
    <SidebarWrapper>
      <SidebarGroup>
        <SidebarItem label="Dashboard" active href="/dashboard">
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