import { fetchData, type IResponse } from "../../lib/auth";
import type { TeamEntity } from "../../lib/types/entities/team.entity";
import { Team } from "../../lib/types/class/entities";

export const load = async ({ fetch }) => {
  const data: IResponse | void = await fetchData("teams", fetch);
  if (!data) {
    return { error: "An error occurred", data: null };
  }
  if (data.status === 401) {
    return { error: "You are not authorized to view this page", data: null };
  }
  const teamsE = data.json as TeamEntity[];

  return { error: null, data: teamsE.map((team) => new Team(team)) };
};
