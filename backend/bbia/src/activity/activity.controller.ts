import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { CompleteActivityDto } from './dto/complete-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @ApiResponse({ status: 201, type: Activity })
  create(@Body() createActivityDto: CreateActivityDto) : Promise<Activity> {
    return this.activityService.create(createActivityDto);
  }

  @Post('complete')
  @ApiResponse({ status: 201, type: Activity })
  complete(@Body() completeActivityDto: CompleteActivityDto) : Promise<Activity> {
    return this.activityService.complete(completeActivityDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Activity] })
  findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Activity })
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: Activity })
  update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
    return this.activityService.update(+id, updateActivityDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: Activity })
  remove(@Param('id') id: string) {
    return this.activityService.remove(+id);
  }
}
