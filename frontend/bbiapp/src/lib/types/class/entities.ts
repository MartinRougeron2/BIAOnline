import type { ActivityEntity } from "../entities/activity.entity";
import type { ImpactEntity, ImpactActivity } from "../entities/impact.entity";
import type {
  ServiceActivity,
  ServiceEntity,
} from "../entities/service.entity";
import type { TeamActivity, TeamEntity } from "../entities/team.entity";
import type { VendorEntity } from "../entities/vendor.entity";

function stringToDate(dateString: string): Date {
  // datastring is in YYYY-MM-DDTHH:MM:SSZ format
  const date = new Date(dateString);
  return date;
}

class Vendor implements Partial<VendorEntity> {
  id: number;
  name: string;
  description: string;
  contact: string;
  status: string;
  tags: string[];
  defaultRTO: number;
  defaultRPO: number;
  createdAtDate: Date;
  createdAt: string;
  updatedAtDate: Date;
  updatedAt: string;

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
    this.createdAtDate = stringToDate(vendor.createdAt);
    this.updatedAt = vendor.updatedAt;
    this.updatedAtDate = stringToDate(vendor.updatedAt);
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
  createdAtDate: Date;
  createdAt: string;
  updatedAtDate: Date;
  updatedAt: string;

  constructor(team: TeamEntity) {
    this.id = team.id;
    this.name = team.name;
    this.description = team.description;
    this.owner = team.owner;
    this.status = team.status;
    this.membersnumber = team.membersnumber;
    this.tags = team.tags;
    this.createdAt = team.createdAt;
    this.createdAtDate = stringToDate(team.createdAt);
    this.updatedAt = team.updatedAt;
    this.updatedAtDate = stringToDate(team.updatedAt);
  }
}

class Impact implements ImpactEntity {
  id: number;
  name: string;
  updatedAtDate: Date;
  updatedAt: string;
  timeline: number[];
  impacts: number[];
  createdAtDate: Date;
  createdAt: string;
  activityId: number;

  constructor(impact: ImpactEntity) {
    this.id = impact.id;
    this.name = impact.name;
    this.timeline = impact.timeline;
    this.impacts = impact.impacts;
    this.createdAt = impact.createdAt;
    this.createdAtDate = stringToDate(impact.createdAt);
    this.updatedAt = impact.updatedAt;
    this.updatedAtDate = stringToDate(impact.updatedAt);
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
  createdAtDate: Date;
  createdAt: string;
  updatedAtDate: Date;
  updatedAt: string;
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
    this.createdAtDate = stringToDate(service.createdAt);
    this.updatedAt = service.updatedAt;
    this.updatedAtDate = stringToDate(service.updatedAt);
    this.vendor = {
      id: service.vendor.id ?? 0,
      name: service.vendor.name ?? "",
      defaultRTO: service.vendor.defaultRTO ?? 0,
      defaultRPO: service.vendor.defaultRPO ?? 0,
    };
  }
}

class Activity implements ActivityEntity {
  id: number;
  name: string;
  description: string;
  status: string;
  tags: string[];
  createdAtDate: Date;
  createdAt: string;
  updatedAtDate: Date;
  updatedAt: string;
  impacts: ImpactActivity[];
  services: ServiceActivity[];
  teams: TeamActivity[];
  criticality: string;
  owner: string;
  validation: string;
  volume: string;
  frequency: string;
  location: string;
  RTO: number;
  RPO: number;

  constructor(activity: ActivityEntity) {

    console.log(activity);
    
    this.id = activity.id;
    this.name = activity.name;
    this.description = activity.description;
    this.status = activity.status;
    this.tags = activity.tags;
    this.createdAt = activity.createdAt;
    this.createdAtDate = stringToDate(activity.createdAt);
    this.updatedAt = activity.updatedAt;
    this.updatedAtDate = stringToDate(activity.updatedAt);

    if (
      activity.impacts[0] &&
      activity.impacts[0].id &&
      activity.impacts[0].name &&
      activity.impacts[0].timeline &&
      activity.impacts[0].impacts
    ) {
      this.impacts = activity.impacts.map((impact) => {
        return {
          id: impact.id ?? 0,
          name: impact.name ?? "",
          timeline: impact.timeline ?? [],
          impacts: impact.impacts ?? [],
        };
      });
    } else {
      this.impacts = [];
    }
    if (
      activity.services[0] &&
      activity.services[0].id
    ) {
      this.services = activity.services.map((service) => {
        return {
          id: service.id,
          name: service.name,
          RTO: service.RTO,
          RPO: service.RPO,
          vendor: {
            id: service.vendor.id,
            name: service.vendor.name,
          },
        };
      });
    } else {
      this.services = [];
    }
    if (activity.teams[0] && activity.teams[0].id && activity.teams[0].name) {
      this.teams = activity.teams.map((team) => {
        return {
          id: team.id,
          name: team.name,
        };
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
