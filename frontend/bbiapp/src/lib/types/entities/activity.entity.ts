import type { ImpactActivity } from "./impact.entity";
import type { ServiceActivity } from "./service.entity";
import type { TeamActivity } from "./team.entity";

export interface ActivityEntity {
  id: number;
  name: string;
  description: string;
  criticality: string;
  owner: string;
  validation: string;
  volume: string;
  frequency: string;
  location: string;
  status: string;
  RTO: number;
  RPO: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  services: ServiceActivity[];
  teams: TeamActivity[];
  impacts: ImpactActivity[];
}
