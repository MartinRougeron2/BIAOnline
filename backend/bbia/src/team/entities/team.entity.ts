import { ApiProperty } from "@nestjs/swagger";
import { Team as Base } from "@prisma/client";

export class Team implements Base {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    owner: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    membersnumber: number;

    @ApiProperty()
    tags: string[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

}