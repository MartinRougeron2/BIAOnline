import type { ActivityEntity } from "../entities/activity.entity";
import type { ImpactEntity } from "../entities/impact.entity";
import type { ServiceEntity } from "../entities/service.entity";
import type { TeamEntity } from "../entities/team.entity";
import type { VendorEntity } from "../entities/vendor.entity";


class Vendor implements VendorEntity {
    id: number;
    name: string;
    description: string;
    contact: string;
    status: string;
    tags: string[];
    defaultRTO: number;
    defaultRPO: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(vendor: VendorEntity) {
        this.id = vendor.id;
        this.name = vendor.name;
        this.description = vendor.description;
        this.contact = vendor.contact;
        this.status = vendor.status;
        this.tags = vendor.tags;
        this.defaultRTO = vendor.defaultRTO;
        this.defaultRPO = vendor.defaultRPO;
        this.createdAt = vendor.createdAt;
        this.updatedAt = vendor.updatedAt;
    }
}

class Team implements TeamEntity {
    id: number;
    name: string;
    description: string;
    owner: string;
    status: string;
    membersnumber: number;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;

    constructor(team: TeamEntity) {
        this.id = team.id;
        this.name = team.name;
        this.description = team.description;
        this.owner = team.owner;
        this.status = team.status;
        this.membersnumber = team.membersnumber;
        this.tags = team.tags;
        this.createdAt = team.createdAt;
        this.updatedAt = team.updatedAt;
    }
}

class Impact implements ImpactEntity {
    id: number;
    name: string;
    updatedAt: Date;
    timeline: string[];
    impacts: number[];
    createdAt: Date;
    activityId: number;

    constructor(impact: ImpactEntity) {
        this.id = impact.id;
        this.name = impact.name;
        this.timeline = impact.timeline;
        this.impacts = impact.impacts;
        this.createdAt = impact.createdAt;
        this.updatedAt = impact.updatedAt;
        this.activityId = impact.activityId;
    }
}

class Service implements ServiceEntity {
    id: number;
    name: string;
    description: string;
    owner: string;
    status: string;
    location: string;
    RTO: number;
    RPO: number;
    vendorId: number;
    vendorIdString: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    vendor: Partial<VendorEntity>;

    constructor(service: ServiceEntity) {
        this.id = service.id;
        this.name = service.name;
        this.description = service.description;
        this.owner = service.owner;
        this.status = service.status;
        this.location = service.location;
        this.RTO = service.RTO;
        this.RPO = service.RPO;
        this.vendorId = service.vendorId;
        this.vendorIdString = this.vendorId.toString();
        this.tags = service.tags;
        this.createdAt = service.createdAt;
        this.updatedAt = service.updatedAt;
        this.vendor = {
            id: service.vendor.id ?? 0,
            name: service.vendor.name ?? "",
            defaultRTO: service.vendor.defaultRTO ?? 0,
            defaultRPO: service.vendor.defaultRPO ?? 0,
        }
    }
}


class Activity implements ActivityEntity {
    
    id: number;
    name: string;
    description: string;
    status: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
    impacts: Partial<ImpactEntity>[];
    services: Partial<ServiceEntity>[];
    teams: Partial<TeamEntity>[];
    criticality: string;
    owner: string;
    validation: string;
    volume: string;
    frequency: string;
    location: string;
    RTO: number;
    RPO: number;

    constructor(activity: ActivityEntity) {
        this.id = activity.id;
        this.name = activity.name;
        this.description = activity.description;
        this.status = activity.status;
        this.tags = activity.tags;
        this.createdAt = activity.createdAt;
        this.updatedAt = activity.updatedAt;
        if (activity.impacts[0].id && activity.impacts[0].name && activity.impacts[0].timeline && activity.impacts[0].impacts) {
            this.impacts = activity.impacts.map((impact) => {
                return {
                    id: impact.id,
                    name: impact.name,
                    timeline: impact.timeline,
                    impacts: impact.impacts,
                }
            });
        } else {
            this.impacts = [];
        }
        if (activity.services[0].id && activity.services[0].name && activity.services[0].RTO && activity.services[0].RPO) {
            this.services = activity.services.map((service) => {
                return {
                    id: service.id,
                    name: service.name,
                    RTO: service.RTO,
                    RPO: service.RPO,
                }
            });
        } else {
            this.services = [];
        }
        if (activity.teams[0].id && activity.teams[0].name) {
            this.teams = activity.teams.map((team) => {
                return {
                    id: team.id,
                    name: team.name,
                }
            });
        } else {
            this.teams = [];
        }
        this.criticality = activity.criticality;
        this.owner = activity.owner;
        this.validation = activity.validation;
        this.volume = activity.volume;
        this.frequency = activity.frequency;
        this.location = activity.location;
        this.RTO = activity.RTO;
        this.RPO = activity.RPO;
    }

}

export { Vendor, Team, Impact, Service, Activity };