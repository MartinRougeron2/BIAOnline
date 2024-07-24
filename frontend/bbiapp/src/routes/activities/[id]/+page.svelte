<script lang="ts">
    import ActivityGet from "$lib/components/activityGET.svelte";
    import { Activity } from "$lib/types/class/entities";

    let defaultTimeLine: number[] = [3600, 7200, 10800, 86400, 172800, 259200];

    let mockData: Activity =
        new Activity({ id: 1, name: 'Activity 1',
         description: 'Activity 1 description', 
         owner: 'Owner 1', status: 'Active', location: 'Location 1', RTO: 57888, RPO: 665
         , tags: ['tag1', 'tag2'], createdAt: new Date(), updatedAt: new Date(), criticality: 'High',
         validation: 'Mr. John Doe', volume: '4500 / 5000', frequency: 'Daily',
         services: [
             { id: 1, name: 'Severine', RTO: 567888, RPO: 665 },
             { id: 2, name: 'LCL 2', RTO: 56788, RPO: 665 },
             { id: 3, name: 'Mimecast 1', RTO: 58, RPO: 665 },
             { id: 4, name: 'Service 4', RTO: 568, RPO: 665 },
             { id: 5, name: 'Service 5', RTO: 56888, RPO: 665 },
         ],
         teams: [
             { id: 1, name: 'Team 1' },
             { id: 2, name: 'Team 2' },
             { id: 3, name: 'Team 3' },
             { id: 4, name: 'Team 4' },
             { id: 5, name: 'Team 5' },
         ],
         impacts: [
             { id: 1, name: 'Impact Finance', timeline: defaultTimeLine, impacts: [0, 1, 2, 3, 5, 5] },
             { id: 2, name: 'Impact Image', timeline: defaultTimeLine, impacts: [0, 1, 1, 1, 1, 1] },
             { id: 3, name: 'Impact Organization', timeline: defaultTimeLine, impacts: [0, 3, 4, 5, 5, 5] },
             { id: 4, name: 'Impact Juri', timeline: defaultTimeLine, impacts: [0, 1, 2, 3, 4, 5] },
         ],
        });
</script>

<ActivityGet bind:item={mockData} />