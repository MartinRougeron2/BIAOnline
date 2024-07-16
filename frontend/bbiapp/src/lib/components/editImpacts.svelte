<script lang="ts">
    import ImpactEvaulation from "$lib/components/impactEvaulation.svelte";
    import type { ImpactType } from "$lib/components/impactEvaulation.types";
      import { Modal, Button, Listgroup, ListgroupItem } from "flowbite-svelte";
    
        export let impacts: ImpactType[];
    
        export let modalState: boolean;
        $: impactChooseIndex = 0;
        // max impact (max between all impact at each index)
        $: maxImpacts = {
            name: 'Max Impact',
            impacts: impacts[0].impacts.map((impact, index) => {
                let max = 0;
                impacts.forEach(impact => {
                    if (impact.impacts[index].impactSize > max) {
                        max = impact.impacts[index].impactSize;
                    }
                });
                return {
                    time: impact.time,
                    impactSize: max
                }
            }),
            scaleMin: impacts[0].scaleMin,
            scaleMax: impacts[0].scaleMax,
            colors: impacts[0].colors
        } as ImpactType;

    
    </script>
    
    <main>
        <Modal title="Impact Evaluation" bind:open={modalState} size="xl">
            <!-- 2 columns, one to choose impact, second one with impact-->
            <div>
                <div class="flex justify-between">
                    <Listgroup class="mr-4">
                        {#each [...impacts, maxImpacts] as impact, index}
                            <ListgroupItem active on:click={() => impactChooseIndex = index}>
                                <p class="{index === impactChooseIndex ? 'text-blue-500' : ''}">{impact.name}</p>
                            </ListgroupItem>
                        {/each}
                    </Listgroup>
                    <div class="flex flex-col">
                        {#if impactChooseIndex === impacts.length}
                            <ImpactEvaulation bind:impact={maxImpacts} disable />
                        {:else}
                            <ImpactEvaulation bind:impact={impacts[impactChooseIndex]} />
                        {/if}
                    </div>
                </div>
                <div class="flex justify-between mt-4">
                    <Button color="red" on:click={() => modalState = false}>Cancel</Button>
                    <div>
                        <Button color="blue" on:click={() => impactChooseIndex === impacts.length ? impactChooseIndex = 0 : impactChooseIndex++}>Next</Button>
                        <Button color="green" on:click={() => modalState = false}>Save</Button>
                    </div>
                </div>
        </Modal>
    
    </main>