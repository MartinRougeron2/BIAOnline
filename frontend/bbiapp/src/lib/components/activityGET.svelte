<script lang="ts">
  import ViewMaxImpact from "$lib/components/viewMaxImpact.svelte";
  import EditImpacts from "$lib/components/editImpacts.svelte";
  import RtoViewer from "$lib/components/RTOViewer.svelte";
  import { createEventDispatcher, onMount } from "svelte";

  import {
    Range,
    Button,
    Input,
    Select,
    Label,
    Textarea,
    MultiSelect,
    Badge,
    Toggle,
  } from "flowbite-svelte";
  import { AngleDownOutline, AngleUpOutline } from "flowbite-svelte-icons";
  import { impactsTimelineToImpactType, numberSecToTime } from "$lib/utils";
  import { Activity, Service, Team } from "$lib/types/class/entities";
  import ViewImpact from "$lib/components/viewImpact.svelte";
  import type {
    TeamActivity,
    TeamEntity,
  } from "$lib/types/entities/team.entity";
  import type {
    ServiceActivity,
    ServiceEntity,
  } from "$lib/types/entities/service.entity";
  import { fetchData, type IResponse } from "$lib/auth";
  import type { VendorEntity } from "$lib/types/entities/vendor.entity";

  export let item: Activity;

  let modalStateImpacts: boolean = false;
  let editRTO: boolean = false;

  const dispatch = createEventDispatcher();

  const save = () => {
    dispatch("save", item);
  };

  $: dynamicImpacts = item.impacts.map((impact) =>
    impactsTimelineToImpactType(impact, 5),
  );

  $: generalShow = false;
  $: underlyingShow = false;
  $: impactShow = false;
  $: RTOhow = false;

  let teams: Team[] = [];

  let services: Service[] = [];

  onMount(async () => {
    const dataS: Promise<IResponse | void> = fetchData("services", fetch);
    const dataT: Promise<IResponse | void> = fetchData("teams", fetch);

    if (!dataS || !dataT) return;
    const { servicesE, teamsE } = await Promise.all([dataS, dataT]).then(
      ([dataS, dataT]) => {
        if (dataS && dataT) {
          return {
            servicesE: dataS.json as ServiceEntity[],
            teamsE: dataT.json as TeamEntity[],
          };
        }
        return { servicesE: [], teamsE: [] };
      },
    );
    if (servicesE && teamsE) {
      services = servicesE.map((service) => new Service(service));
      teams = teamsE.map((team) => new Team(team));
    }
  });

  let servicesSelected = item.services.map((service) => service.id);
  let teamsSelected = item.teams.map((team) => team.id);

  function saveUnderlying() {
    const servicesActivitySelected: Service[] = services.filter((service) =>
      servicesSelected.includes(service.id),
    );
    const teamsActivitySelected: Team[] = teams.filter((team) =>
      teamsSelected.includes(team.id),
    );
    item.services = servicesActivitySelected.map(
      (service) =>
        ({
          id: service.id,
          name: service.name,
          vendor: service.vendor,
          RTO: service.RTO,
        }) as ServiceActivity,
    );
    item.teams = teamsActivitySelected as TeamActivity[];
  }
</script>

<div class="activity-container">
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
            on:click={() => (modalStateImpacts = !modalStateImpacts)}
            >Edit</Button
          >
        </div>
        <div class="grid grid-cols-4 gap-4 mt-4 impacts">
          {#each dynamicImpacts as impact}
            <ViewImpact {impact} heightCanvas={200} />
          {/each}
        </div>
        <div class="mt-4 max-impact">
          <ViewMaxImpact bind:impacts={dynamicImpacts} heightCanvas={300} />
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
            <div class="flex justify-end col-start-2 mr-4">
              <Toggle bind:checked={editRTO} color="blue" />
              Edit RTO
            </div>
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
              disabled={!editRTO}
            />
            <RtoViewer bind:activity={item} heightCanvas={200} />
          </div>
        {/if}
      </div>
    </div>
  </div>
  <div>
    <div class="flex justify-end mt-4">
      <Button color="green" size="lg" on:click={() => save()}>Save</Button>
    </div>
  </div>
</div>

<style>
  .max-impact {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .activity-container {
    padding: 1rem;
    padding-left: 0;
  }
</style>
