import { ApiProperty } from "@nestjs/swagger";
import { Service as Base } from "@prisma/client";

export class Service implements Base {
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
    location: string;
    
    @ApiProperty()
    RTO: number;
    
    @ApiProperty()
    RPO: number;
    
    @ApiProperty()
    vendorId: number;
    
    @ApiProperty()
    tags: string[];
    
    @ApiProperty()
    createdAt: Date;
    
    @ApiProperty()
    updatedAt: Date;
    
}