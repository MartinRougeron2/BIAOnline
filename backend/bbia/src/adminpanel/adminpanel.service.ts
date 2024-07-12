import { Injectable } from '@nestjs/common';
import { CreateAdminpanelDto } from './dto/create-adminpanel.dto';
import { UpdateAdminpanelDto } from './dto/update-adminpanel.dto';

@Injectable()
export class AdminpanelService {
  create(createAdminpanelDto: CreateAdminpanelDto) {
    return 'This action adds a new adminpanel';
  }

  findAll() {
    return `This action returns all adminpanel`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adminpanel`;
  }

  update(id: number, updateAdminpanelDto: UpdateAdminpanelDto) {
    return `This action updates a #${id} adminpanel`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminpanel`;
  }
}
