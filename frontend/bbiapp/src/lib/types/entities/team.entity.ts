interface TeamEntity {
  id: number;

  name: string;

  description: string;

  owner: string;

  status: string;

  membersnumber: number;

  tags: string[];

  createdAt: Date;

  updatedAt: Date;
}

type TeamActivity = {
  id: number;
  name: string;
};

export type { TeamEntity, TeamActivity };
