import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';

export interface UpdateTeamDto extends PartialType(CreateTeamDto) {}
