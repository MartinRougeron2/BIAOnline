import type { ImpactEntity } from "./impact.entity";
import type { ServiceEntity } from "./service.entity";
import type { TeamEntity } from "./team.entity";

export interface ActivityEntity  {
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
    services: Partial<ServiceEntity>[];
    teams: Partial<TeamEntity>[];
    impacts: Partial<ImpactEntity>[];
}
