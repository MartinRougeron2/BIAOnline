import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateActivityDto extends PartialType(CreateActivityDto) {
  @ApiProperty()
  RTO: number;

  @ApiProperty()
  RPO: number;
}
