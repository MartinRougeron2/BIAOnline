interface TeamEntity {
  id: number;

  name: string;

  description: string;

  owner: string;

  status: string;

  membersnumber: number;

  tags: string[];

  createdAt: string;

  updatedAt: string;
}

type TeamActivity = {
  id: number;
  name: string;
};

export type { TeamEntity, TeamActivity };
