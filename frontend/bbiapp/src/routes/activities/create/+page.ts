import { fetchData, type IResponse } from "../../../lib/auth";

export const load = async ({ fetch }) => {
  const servicesP = fetchData("services", fetch);
  const teamsP = fetchData("teams", fetch);
  const { services, teams } = await Promise.all([servicesP, teamsP]).then(
    (values) => {
      return { services: values[0], teams: values[1] };
    },
  );

  if (!services || !teams) {
    return { error: "An error occurred", data: null };
  }

  return { data: { services: services.json, teams: teams.json } };
};
