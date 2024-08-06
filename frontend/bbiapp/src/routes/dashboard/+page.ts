import { fetchData, type IResponse } from "../../lib/auth";
import { Activity } from "../../lib/types/class/entities";
import type { ActivityEntity } from "../../lib/types/entities/activity.entity";

export const load = async ({ fetch }) => {
  const data: IResponse | void = await fetchData("activities", fetch);
  if (!data) {
    return { error: "An error occurred", data: null };
  }
  if (data.status === 401) {
    return { error: "You are not authorized to view this page", data: null };
  }
  const activitysE = data.json as ActivityEntity[];

  const activitys = activitysE.map((activity) => new Activity(activity));

  return {
    error: null,
    data: activitys,
  };
};
