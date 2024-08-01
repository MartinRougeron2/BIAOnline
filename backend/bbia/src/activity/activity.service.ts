import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CompleteActivityDto } from './dto/complete-activity.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  create(createActivityDto: CreateActivityDto) {
    const servicesIdNumber: number[] = createActivityDto.servicesId.map(Number);
    const teamsIdNumber: number[] = createActivityDto.teamsId.map(Number);
    return this.prisma.activity.create({
      data: {
        RPO: 0,
        RTO: 0,
        teams: {
          connect: teamsIdNumber.map((id) => ({ id })),
        },
        services: {
          connect: servicesIdNumber.map((id) => ({ id })),
        },
        name: createActivityDto.name,
        description: createActivityDto.description,
        criticality: createActivityDto.criticality,
        owner: createActivityDto.owner,
        validation: createActivityDto.validation,
        volume: createActivityDto.volume,
        frequency: createActivityDto.frequency,
        location: createActivityDto.location,
        status: createActivityDto.status,
        tags: createActivityDto.tags,
      },
    });
  }

  complete(completeActivityDto: CompleteActivityDto) {
    return this.prisma.activity.update({
      where: {
        id: completeActivityDto.id,
      },
      include: {
        services: true,
      },
      data: {
        RTO: completeActivityDto.RTO,
        RPO: completeActivityDto.RPO,
      },
    });
  }

  findAll() {
    return this.prisma.activity.findMany({
      include: {
        services: {
          include: {
            vendor: true,
          },
        },
        teams: true,
        impacts: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.activity.findUnique({
      where: {
        id: id,
      },
      include: {
        services: true,
        teams: true,
      },
    });
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return this.prisma.activity.update({
      where: {
        id: id,
      },
      data: {
        RTO: updateActivityDto.RTO,
        RPO: updateActivityDto.RPO,
        services: {
          connect: updateActivityDto.servicesId?.map((id) => ({
            id: Number(id),
          })),
        },
        teams: {
          connect: updateActivityDto.teamsId?.map((id) => ({ id: Number(id) })),
        },
        ...updateActivityDto,
      },
    });
  }

  remove(id: number) {
    return this.prisma.activity.delete({
      where: {
        id: id,
      },
    });
  }
}
