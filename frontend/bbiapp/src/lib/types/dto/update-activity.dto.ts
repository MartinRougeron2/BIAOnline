import { PartialType } from '@nestjs/mapped-types';
import { CreateActivityDto } from './create-activity.dto';



export interface UpdateActivityDto extends PartialType(CreateActivityDto) {
    
    RTO: number;

    
    RPO: number;

}