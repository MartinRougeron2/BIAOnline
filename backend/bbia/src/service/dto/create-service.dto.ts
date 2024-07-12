import { ApiProperty } from "@nestjs/swagger";

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
    activitiesSpecificId: string[];

    @ApiProperty()
    location: string;

    @ApiProperty()
    RTO: number;

    @ApiProperty()
    RPO: number;

    @ApiProperty()
    vendorId: number;

    @ApiProperty()
    tags: string[];

}
