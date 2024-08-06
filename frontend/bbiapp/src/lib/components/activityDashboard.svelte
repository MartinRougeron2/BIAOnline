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
    Table,
    TableHead,
    TableHeadCell,
    TableBody,
    TableBodyRow,
    TableBodyCell,
  } from "flowbite-svelte";
  import { AngleDownOutline, AngleUpOutline } from "flowbite-svelte-icons";
  import { impactsTimelineToImpactType, numberSecToTime } from "$lib/utils";
  import { Activity, Service, Team, Vendor } from "$lib/types/class/entities";
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
  import CrudTable from "./crudTable.svelte";

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
  <div class="">
    <p class="text-2xl"><strong>{item.name}</strong></p>
    <p class="text-lg">{item.description}</p>
  </div>

  <div class="mt-4 bg-gray-50 p-4 rounded w-56">
    <div class="grid grid-cols-2 gap-2">
      <div class="text-md font-bold">Owner</div>
      <div class="text-md col-span-1">{item.owner}</div>

      <div class="text-md font-bold">Status</div>
      <div class="text-md col-span-1">
        <Badge color={item.status === "Active" ? "green" : "red"}>
          {item.status}
        </Badge>
      </div>

      <div class="text-md font-bold">Location</div>
      <div class="text-md col-span-1">{item.location}</div>

      <div class="text-md font-bold">Tags</div>
      <div class="text-md col-span-1">
        {#each item.tags as tag}
          <Badge color="blue" class="ml-1">{tag}</Badge>
        {/each}
      </div>

      <div class="text-md font-bold">Criticality</div>
      <div class="text-md col-span-1">
        {#if item.criticality === "Critical"}
          <Badge color="red" class="ml-1">Critical</Badge>
        {:else if item.criticality === "High"}
          <Badge color="yellow" class="ml-1">High</Badge>
        {:else if item.criticality === "Medium"}
          <Badge color="green" class="ml-1">Medium</Badge>
        {:else if item.criticality === "Low"}
          <Badge color="blue" class="ml-1">Low</Badge>
        {/if}
      </div>

      <div class="text-md font-bold">Validation</div>
      <div class="text-md col-span-1">{item.validation}</div>

      <div class="text-md font-bold">Volume</div>
      <div class="text-md col-span-1">{item.volume}</div>

      <div class="text-md font-bold">Frequency</div>
      <div class="text-md col-span-1">{item.frequency}</div>

      <div class="text-md font-bold">RTO</div>
      <div class="text-md col-span-1">
        <span>{numberSecToTime(item.RTO)}</span>
      </div>

      <div class="text-md font-bold">RPO</div>
      <div class="text-md col-span-1">
        <span>{numberSecToTime(item.RPO)}</span>
      </div>
    </div>
  </div>

  <div>
    <p class="text-2xl mt-4">Services</p>
    <Table class="mt-4 border-2 border-brey rounded">
      <TableHead>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Vendor</TableHeadCell>
        <TableHeadCell>RTO</TableHeadCell>
        <TableHeadCell>RPO</TableHeadCell>
        <TableHeadCell>Vendor</TableHeadCell>
        <TableHeadCell>Tags</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each services.filter((service) => item.services
            .map((service) => service.id)
            .includes(service.id)) as service}
          <TableBodyRow>
            <TableBodyCell>{service.name}</TableBodyCell>
            <TableBodyCell>{service.vendor.name}</TableBodyCell>
            <TableBodyCell>{numberSecToTime(service.RTO)}</TableBodyCell>
            <TableBodyCell>{numberSecToTime(service.RPO)}</TableBodyCell>
            <TableBodyCell>{service.vendor.name}</TableBodyCell>
            <TableBodyCell>
              {#each service.tags as tag}
                <Badge color="blue" class="ml-1">{tag}</Badge>
              {/each}
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <div>
    <p class="text-2xl mt-4">Teams</p>
    <Table class="mt-4 border-2 border-brey rounded">
      <TableHead>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Description</TableHeadCell>
        <TableHeadCell>Status</TableHeadCell>
        <TableHeadCell>Members</TableHeadCell>
        <TableHeadCell>Owner</TableHeadCell>
        <TableHeadCell>Tags</TableHeadCell>
      </TableHead>
      <TableBody>
        {#each teams.filter((team) => item.teams
            .map((team) => team.id)
            .includes(team.id)) as team}
          <TableBodyRow>
            <TableBodyCell>{team.name}</TableBodyCell>
            <TableBodyCell>{team.description}</TableBodyCell>
            <TableBodyCell>
              <Badge
                color={team.status === "Active"
                  ? "green"
                  : team.status === "Inactive"
                    ? "red"
                    : "yellow"}
                class="ml-1">{team.status}</Badge
              >
            </TableBodyCell>
            <TableBodyCell>{team.membersnumber}</TableBodyCell>
            <TableBodyCell>{team.owner}</TableBodyCell>
            <TableBodyCell>
              {#each team.tags as tag}
                <Badge color="blue" class="ml-1">{tag}</Badge>
              {/each}
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>

  <div>
    <div class="mt-4 max-impact">
      <ViewMaxImpact bind:impacts={dynamicImpacts} heightCanvas={300} />
    </div>
  </div>

  <div>
    <p class="text-2xl mt-4 text-center">Impact Timeline</p>
    <div class="mt-4">
      <RtoViewer bind:activity={item} heightCanvas={200} widthCanvas={700} />
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
  }
</style>
