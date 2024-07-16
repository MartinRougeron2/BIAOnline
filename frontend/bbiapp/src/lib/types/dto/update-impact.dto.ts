import { PartialType } from '@nestjs/mapped-types';
import { CreateImpactDto } from './create-impact.dto';

export interface UpdateImpactDto extends PartialType(CreateImpactDto) {}
