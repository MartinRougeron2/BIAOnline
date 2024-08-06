import { ApiProperty } from '@nestjs/swagger';

export class CompleteActivityDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  RTO: string;

  @ApiProperty()
  RPO: string;
}
