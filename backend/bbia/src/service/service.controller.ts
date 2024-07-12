import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Post()
  @ApiResponse({ status: 201, type: Service })
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  @ApiResponse({ status: 201, type: Service })
  findAll() {
    return this.serviceService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 201, type: Service })
  findOne(@Param('id') id: string) {
    return this.serviceService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 201, type: Service })
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 201, type: Service })
  remove(@Param('id') id: string) {
    return this.serviceService.remove(+id);
  }
}
