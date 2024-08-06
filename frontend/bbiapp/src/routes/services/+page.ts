import { fetchData, type IResponse } from "../../lib/auth";
import type { ServiceEntity } from "../../lib/types/entities/service.entity";
import { Service } from "../../lib/types/class/entities";

export const load = async ({ fetch }) => {
  const data: IResponse | void = await fetchData("services", fetch);
  if (!data) {
    return { error: "An error occurred", data: null };
  }
  if (data.status === 401) {
    return { error: "You are not authorized to view this page", data: null };
  }
  const servicesE = data.json as ServiceEntity[];

  return {
    error: null,
    data: servicesE.map((service) => new Service(service)),
  };
};
