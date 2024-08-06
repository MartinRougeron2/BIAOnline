import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  activitiesSpecificId: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  RTO: string;

  @ApiProperty()
  RPO: string;

  @ApiProperty()
  vendorId: number;

  @ApiProperty()
  tags: string | string[];
}
