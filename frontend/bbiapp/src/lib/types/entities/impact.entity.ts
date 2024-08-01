interface ImpactEntity {
  id: number;

  name: string;

  timeline: number[];

  impacts: number[];

  createdAt: string;

  updatedAt: string;

  activityId: number;
}

type ImpactActivity = {
  id: number;
  name: string;
  timeline: number[];
  impacts: number[];
};

export type { ImpactEntity, ImpactActivity };
