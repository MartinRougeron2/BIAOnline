import { ApiProperty } from "@nestjs/swagger";
import { Impact as Base } from "@prisma/client";

export class Impact implements Base {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    timeline: number[];

    @ApiProperty()
    impacts: number[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    activityId: number;

}
