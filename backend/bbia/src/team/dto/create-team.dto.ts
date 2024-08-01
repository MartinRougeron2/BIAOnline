import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  usersId: string[];

  @ApiProperty()
  status: string;

  @ApiProperty()
  membersnumber: string;

  @ApiProperty()
  tags: string;
}
