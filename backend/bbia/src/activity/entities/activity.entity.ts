import { Activity as Base } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class Activity implements Base {
    @ApiProperty()
    id: number;
    
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
    RTO: number;
    
    @ApiProperty()
    RPO: number;
    
    @ApiProperty()
    tags: string[];
    
    @ApiProperty()
    createdAt: Date;
    
    @ApiProperty()
    updatedAt: Date;
}
