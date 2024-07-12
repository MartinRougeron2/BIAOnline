import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminpanelService } from './adminpanel.service';
import { CreateAdminpanelDto } from './dto/create-adminpanel.dto';
import { UpdateAdminpanelDto } from './dto/update-adminpanel.dto';

@Controller('adminpanel')
export class AdminpanelController {
  constructor(private readonly adminpanelService: AdminpanelService) {}

  @Post()
  create(@Body() createAdminpanelDto: CreateAdminpanelDto) {
    return this.adminpanelService.create(createAdminpanelDto);
  }

  @Get()
  findAll() {
    return this.adminpanelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminpanelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminpanelDto: UpdateAdminpanelDto) {
    return this.adminpanelService.update(+id, updateAdminpanelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminpanelService.remove(+id);
  }
}
