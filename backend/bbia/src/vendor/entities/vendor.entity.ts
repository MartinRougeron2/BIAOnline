import { ApiProperty } from "@nestjs/swagger";
import { Vendor as Base } from "@prisma/client";

export class Vendor implements Base {
    @ApiProperty()
    id: number;

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

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

}