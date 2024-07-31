import { ApiProperty } from '@nestjs/swagger';

export class CreateVendorDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  tags: string[];

  @ApiProperty()
  defaultRTO: number;

  @ApiProperty()
  defaultRPO: number;
}
