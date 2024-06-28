import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImpactsService } from './impacts.service';
import { CreateImpactDto } from './dto/create-impact.dto';
import { UpdateImpactDto } from './dto/update-impact.dto';

@Controller('impacts')
export class ImpactsController {
  constructor(private readonly impactsService: ImpactsService) {}

  @Post()
  create(@Body() createImpactDto: CreateImpactDto) {
    return this.impactsService.create(createImpactDto);
  }

  @Get()
  findAll() {
    return this.impactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.impactsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImpactDto: UpdateImpactDto) {
    return this.impactsService.update(+id, updateImpactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.impactsService.remove(+id);
  }
}
