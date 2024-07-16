import { PartialType } from '@nestjs/mapped-types';
import { CreateVendorDto } from './create-vendor.dto';

export interface UpdateVendorDto extends PartialType(CreateVendorDto) {}
