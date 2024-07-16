import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-service.dto';

export interface UpdateServiceDto extends PartialType(CreateServiceDto) {}
