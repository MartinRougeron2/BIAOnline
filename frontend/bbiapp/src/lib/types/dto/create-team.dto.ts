export interface CreateTeamDto {
  name: string;

  description: string;

  owner: string;

  usersId: string[];

  status: string;

  membersnumber: number;

  tags: string[];
}
