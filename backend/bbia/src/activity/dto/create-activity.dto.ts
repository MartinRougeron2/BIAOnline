import { ApiProperty } from '@nestjs/swagger';
import { Impact } from 'src/impact/entities/impact.entity';
import { Service } from 'src/service/entities/service.entity';
import { Team } from 'src/team/entities/team.entity';

export class CreateActivityDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  criticality: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  validation: string;

  @ApiProperty()
  volume: string;

  @ApiProperty()
  frequency: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  impacts: Partial<Impact>[];

  @ApiProperty()
  status: string;

  @ApiProperty()
  services: Partial<Service>[];

  @ApiProperty()
  teams: Partial<Team>[];

  @ApiProperty()
  tags: string;
}
