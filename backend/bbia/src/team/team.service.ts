import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto) {
    const usersIdNumber: number[] = createTeamDto.usersId.map(Number);

    return this.prisma.team.create({
      data: {
        users: {
          connect: usersIdNumber.map((id) => ({ id })),
        },
        name: createTeamDto.name,
        description: createTeamDto.description,
        owner: createTeamDto.owner,
        status: createTeamDto.status,
        membersnumber: createTeamDto.membersnumber,
        tags: createTeamDto.tags,
      },
    });
  }

  findAll() {
    return this.prisma.team.findMany();
  }

  findOne(id: number) {
    return this.prisma.team.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    const usersIdNumber: number[] = updateTeamDto.usersId.map(Number);

    return this.prisma.team.update({
      where: {
        id: id,
      },
      data: {
        users: {
          set: usersIdNumber.map((id) => ({ id })),
        },
        name: updateTeamDto.name,
        description: updateTeamDto.description,
        owner: updateTeamDto.owner,
        status: updateTeamDto.status,
        membersnumber: updateTeamDto.membersnumber,
        tags: updateTeamDto.tags,
      },
    });
  }

  remove(id: number) {
    return this.prisma.team.delete({
      where: {
        id: id,
      },
    });
  }
}
