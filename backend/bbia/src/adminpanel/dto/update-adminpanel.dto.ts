import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminpanelDto } from './create-adminpanel.dto';

export class UpdateAdminpanelDto extends PartialType(CreateAdminpanelDto) {}
