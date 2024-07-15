import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImpactService } from './impact.service';
import { CreateImpactDto } from './dto/create-impact.dto';
import { UpdateImpactDto } from './dto/update-impact.dto';
import { Impact } from './entities/impact.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('impacts')
export class ImpactController {
  constructor(private readonly impactService: ImpactService) {}

  @Post()
  @ApiResponse({ status: 201, type: Impact })
  create(@Body() createImpactDto: CreateImpactDto) {
    return this.impactService.create(createImpactDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Impact] })
  findAll() {
    return this.impactService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Impact })
  findOne(@Param('id') id: string) {
    return this.impactService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: Impact })
  update(@Param('id') id: string, @Body() updateImpactDto: UpdateImpactDto) {
    return this.impactService.update(+id, updateImpactDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: Impact })
  remove(@Param('id') id: string) {
    return this.impactService.remove(+id);
  }
}
