import { ApiProperty } from "@nestjs/swagger";

export class CreateActivityDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    description: string;
    
    @ApiProperty()
    criticality: string;
    
    @ApiProperty()
    owner: string;
    
    @ApiProperty()
    validation: string;
    
    @ApiProperty()
    volume: string;
    
    @ApiProperty()
    frequency: string;
    
    @ApiProperty()
    location: string;
    
    @ApiProperty()
    status: string;
    
    @ApiProperty()
    apps: string[];
    
    @ApiProperty()
    teams: string[];
    
    @ApiProperty()
    tags: string[];
    
}

