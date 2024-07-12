import { ApiProperty } from "@nestjs/swagger";

export class CreateImpactDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    activityId: number;

    @ApiProperty()
    timeline: string[];
    
    @ApiProperty()
    impacts: number[];
}
