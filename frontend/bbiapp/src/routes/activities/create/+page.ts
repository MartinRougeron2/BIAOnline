import { fetchData, type IResponse } from "../../../lib/auth";


export const load = async () => {
    const servicesP = fetchData('services');
    const teamsP = fetchData('teams');
    const {services, teams} = await Promise.all([servicesP, teamsP]).then((values) => {
        return { services: values[0], teams: values[1] };
    });

    if (!services || !teams) {
        return { error: 'An error occurred', data: null};
    }

    return { data: { services: services.json, teams: teams.json } };
}
