import { fetchData, type IResponse } from "../../../lib/auth";
import type { ActivityEntity } from "../../../lib/types/entities/activity.entity";
import { Activity } from "../../../lib/types/class/entities";

export const load = async ({ params, fetch }) => {
  const data: IResponse | void = await fetchData(
    "activities/" + params.id,
    fetch,
  );
  if (!data) {
    return { error: "An error occurred", data: null };
  }
  if (data.status === 401) {
    return { error: "You are not authorized to view this page", data: null };
  }
  const activitysE = data.json as ActivityEntity;

  return {
    error: null,
    data: activitysE,
  };
};
