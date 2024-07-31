import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('api/v1/teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiResponse({ status: 201, type: Team })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Team] })
  findAll() {
    return this.teamService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Team })
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: Team })
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(+id, updateTeamDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: Team })
  remove(@Param('id') id: string) {
    return this.teamService.remove(+id);
  }
}
