import { ApiProperty } from '@nestjs/swagger';

export class CompleteActivityDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  RTO: number;

  @ApiProperty()
  RPO: number;
}
