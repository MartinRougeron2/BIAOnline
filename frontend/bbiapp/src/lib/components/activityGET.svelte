<script lang="ts">
  import ViewMaxImpact from "$lib/components/viewMaxImpact.svelte";
  import EditImpacts from "$lib/components/editImpacts.svelte";
  import RtoViewer from "$lib/components/RTOViewer.svelte";

  import {
    Range,
    Button,
    Input,
    Select,
    Label,
    Textarea,
    MultiSelect,
    Badge,
  } from "flowbite-svelte";
  import { AngleDownOutline, AngleUpOutline } from "flowbite-svelte-icons";
  import {
    impactsTimelineToImpactType,
    numberSecToTime,
    stringToHashHexColor,
  } from "$lib/utils";
  import { Activity } from "$lib/types/class/entities";
  import ViewImpact from "$lib/components/viewImpact.svelte";
  import type { TeamActivity } from "$lib/types/entities/team.entity";
  import type { ServiceActivity } from "$lib/types/entities/service.entity";

  export let item: Activity;

  let modalStateGeneral: boolean = false;
  let modalStateImpacts: boolean = false;
  let modalStateParts: boolean = false;
  let modalStateRTO: boolean = false;

  $: dynamicImpacts = item.impacts.map((impact) =>
    impactsTimelineToImpactType(impact, 5),
  );

  console.log(item);
  $: generalShow = false;
  $: underlyingShow = false;
  $: impactShow = false;
  $: RTOhow = false;

  const teams: TeamActivity[] = [
    { id: 1, name: "Team 1" },
    { id: 2, name: "Team 2" },
    { id: 3, name: "Team 3" },
    { id: 4, name: "Team 4" },
    { id: 5, name: "Team 5" },
  ];

  const services: ServiceActivity[] = [
    {
      id: 1,
      name: "Severine",
      RTO: 567888,
      RPO: 665,
      vendor: { id: 1, name: "Vendor 1" },
    },
    {
      id: 2,
      name: "LCL 2",
      RTO: 56788,
      RPO: 665,
      vendor: { id: 2, name: "Vendor 2" },
    },
    {
      id: 3,
      name: "Mimecast 1",
      RTO: 58,
      RPO: 665,
      vendor: { id: 3, name: "Vendor 3" },
    },
    {
      id: 4,
      name: "Service 4",
      RTO: 568,
      RPO: 665,
      vendor: { id: 4, name: "Vendor 4" },
    },
    {
      id: 5,
      name: "Service 5",
      RTO: 56888,
      RPO: 665,
      vendor: { id: 5, name: "Vendor 5" },
    },
    {
      id: 6,
      name: "Service 6",
      RTO: 5888,
      RPO: 665,
      vendor: { id: 6, name: "Vendor 6" },
    },
    {
      id: 7,
      name: "Service 7",
      RTO: 5688,
      RPO: 665,
      vendor: { id: 7, name: "Vendor 8" },
    },
    {
      id: 8,
      name: "Service 8",
      RTO: 888,
      RPO: 665,
      vendor: { id: 9, name: "Vendor 9" },
    },
  ];

  let servicesSelected = item.services.map((service) => service.id);
  let teamsSelected = item.teams.map((team) => team.id);

  function saveUnderlying() {
    const servicesActivitySelected: ServiceActivity[] = services.filter(
      (service) => servicesSelected.includes(service.id),
    );
    const teamsActivitySelected: TeamActivity[] = teams.filter((team) =>
      teamsSelected.includes(team.id),
    );
    item.services = servicesActivitySelected;
    item.teams = teamsActivitySelected;
  }
</script>

<main>
  <div class="mt-4">
    <Label>Name</Label>
    <Input bind:value={item.name} />
  </div>
  <div class="mt-4">
    <Label>Description</Label>
    <Textarea bind:value={item.description} />
  </div>

  <div>
    <div class="border-2 border-brey p-2 mt-4 rounded">
      <div class="flex justify-between my-4">
        <div class="flex">
          <Button
            color="dark"
            on:click={() => (generalShow = !generalShow)}
            outline
            class="mr-4"
            size="sm"
          >
            {#if generalShow}
              <AngleUpOutline />
            {:else}
              <AngleDownOutline />
            {/if}
          </Button>
          <p class="text-2xl">General Informations</p>
        </div>
      </div>
      {#if generalShow}
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div>
            <Label>Owner</Label>
            <Input bind:value={item.owner} />
          </div>
          <div>
            <Label>Status</Label>
            <Select bind:value={item.status}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </Select>
          </div>
          <div>
            <Label>Location</Label>
            <Input bind:value={item.location} />
          </div>
          <div>
            <Label>Tags</Label>
            <Input bind:value={item.tags} />
          </div>
          <div>
            <Label>Criticality</Label>
            <Select bind:value={item.criticality}>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Select>
          </div>
          <div>
            <Label>Validation</Label>
            <Input bind:value={item.validation} />
          </div>
          <div>
            <Label>Volume</Label>
            <Input bind:value={item.volume} />
          </div>
          <div>
            <Label>Frequency</Label>
            <Input bind:value={item.frequency} />
          </div>
          <div>
            <Label>Created At</Label>
            <Input bind:value={item.createdAt} disabled />
          </div>
          <div>
            <Label>RTO</Label>
            <Input value={numberSecToTime(item.RTO)} disabled />
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div>
    <div class="border-2 border-brey p-2 mt-4 rounded">
      <div class="flex justify-between my-4">
        <div class="flex">
          <Button
            color="dark"
            on:click={() => (underlyingShow = !underlyingShow)}
            outline
            class="mr-4"
            size="sm"
          >
            {#if underlyingShow}
              <AngleUpOutline />
            {:else}
              <AngleDownOutline />
            {/if}
          </Button>
          <p class="text-2xl">Services & Teams</p>
        </div>
      </div>
      {#if underlyingShow}
        <div class="grid grid-cols-2 gap-4 mt-4">
          <div class="">
            <Label>Services</Label>
            <MultiSelect
              bind:value={servicesSelected}
              items={services.map((service) => ({
                value: service.id,
                name:
                  service.name +
                  " | " +
                  service.vendor.name +
                  " | RTO: " +
                  numberSecToTime(service.RTO),
              }))}
              let:item
              let:clear
            >
              <Badge
                dismissable
                color="green"
                params={{ duration: 100 }}
                on:close={clear}
              >
                {item.name}
              </Badge>
            </MultiSelect>
          </div>
          <div>
            <Label>Teams</Label>
            <MultiSelect
              bind:value={teamsSelected}
              items={teams.map((team) => ({
                value: team.id,
                name: team.name,
              }))}
              let:item
              let:clear
            >
              <Badge
                dismissable
                color="blue"
                params={{ duration: 100 }}
                on:close={clear}
              >
                {item.name}
              </Badge>
            </MultiSelect>
          </div>
          <div class="flex justify-end col-start-2">
            <Button
              color="blue"
              on:click={() => saveUnderlying()}
              class="mr-4 mt-4"
              size="sm"
            >
              Update
            </Button>
          </div>
        </div>
      {/if}
    </div>
  </div>

  <div>
    <div class="border-2 border-brey p-2 mt-4 rounded">
      <div class="flex justify-between my-4">
        <div class="flex">
          <Button
            color="dark"
            on:click={() => (impactShow = !impactShow)}
            outline
            class="mr-4"
            size="sm"
          >
            {#if impactShow}
              <AngleUpOutline />
            {:else}
              <AngleDownOutline />
            {/if}
          </Button>
          <p class="text-2xl">Impacts</p>
        </div>
      </div>
      {#if impactShow}
      <div class="flex justify-end col-start-2 mr-4">
        <Button
        color="blue"
        on:click={() => (modalStateImpacts = !modalStateImpacts)}>Edit</Button
        >
      </div>
        <div class="grid grid-cols-4 gap-4 mt-4 impacts">
          {#each dynamicImpacts as impact}
            <ViewImpact {impact} heightCanvas={200} />
          {/each}
        </div>
        <div class="mt-4 max-impact">
          <ViewMaxImpact bind:impacts={dynamicImpacts} />
        </div>
      {/if}
      <EditImpacts
        impacts={dynamicImpacts}
        bind:modalState={modalStateImpacts}
        bind:activityImpacts={item.impacts}
      />
    </div>

    <div>
      <div class="border-2 border-brey p-2 mt-4 rounded">
        <div class="flex justify-between my-4">
          <div class="flex">
            <Button
              color="dark"
              on:click={() => (RTOhow = !RTOhow)}
              outline
              class="mr-4"
              size="sm"
            >
              {#if RTOhow}
                <AngleUpOutline />
              {:else}
                <AngleDownOutline />
              {/if}
            </Button>
            <p class="text-2xl">Graph</p>
          </div>
        </div>
        {#if RTOhow}
          <div class="mt-4">
            <span class="text-lg font-bold"
              >RTO: {numberSecToTime(item.RTO)}</span
            >
            <Range
              min={0}
              max={Math.max(
                ...item.impacts.map((impact) => Math.max(...impact.timeline)),
              )}
              bind:value={item.RTO}
              step={3600}
            />
            <RtoViewer bind:activity={item} />
          </div>
        {/if}
      </div>
    </div>
  </div>
</main>

<style>
  .max-impact {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  main {
    height: 100%;
    width: 80vw;
  }
</style>
