import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CompleteActivityDto } from './dto/complete-activity.dto';

import { PrismaService } from '../prisma/prisma.service';
import { ImpactService } from 'src/impact/impact.service';

@Injectable()
export class ActivityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly impactService: ImpactService,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    const servicesIdNumber: number[] = createActivityDto.services.map(
      (service) => service.id,
    );
    const teamsIdNumber: number[] = createActivityDto.teams.map(
      (team) => team.id,
    );
    return await this.prisma.activity
      .create({
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
          tags: createActivityDto.tags.split(','),
        },
      })
      .then(async (activity) => {
        if (createActivityDto.impacts.length > 0) {
          const impactsToCreate = createActivityDto.impacts.filter(
            (impact) => impact.id === 0,
          );
          const newImpacts = [];
          impactsToCreate.forEach((impact) => {
            newImpacts.push(
              this.impactService.create({
                name: impact.name,
                timeline: impact.timeline,
                impacts: impact.impacts,
                activityId: activity.id,
              }),
            );
          });

          const impactsToUpdate = createActivityDto.impacts.filter(
            (impact) => impact.id !== 0,
          );
          impactsToUpdate.forEach((impact) => {
            newImpacts.push(
              this.impactService.update(impact.id, {
                name: impact.name,
                timeline: impact.timeline,
                impacts: impact.impacts,
              }),
            );
          });
          await Promise.all(newImpacts);
        }
        return activity;
      });
  }

  complete(completeActivityDto: CompleteActivityDto) {
    return this.prisma.activity.update({
      where: {
        id: completeActivityDto.id,
      },
      include: {
        services: {
          include: {
            vendor: true,
          },
        },
        teams: true,
        impacts: true,
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
        impacts: true,
      },
    });
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    const servicesIdNumber: number[] = updateActivityDto.services.map(
      (service) => service.id,
    );
    const teamsIdNumber: number[] = updateActivityDto.teams.map(
      (team) => team.id,
    );
    return this.prisma.activity.update({
      where: {
        id: id,
      },
      include: {
        services: {
          include: {
            vendor: true,
          },
        },
        teams: true,
        impacts: true,
      },
      data: {
        RTO: updateActivityDto.RTO,
        RPO: updateActivityDto.RPO,
        services: {
          set: servicesIdNumber.map((id) => ({ id })),
        },
        teams: {
          set: teamsIdNumber.map((id) => ({ id })),
        },
        name: updateActivityDto.name,
        description: updateActivityDto.description,
        criticality: updateActivityDto.criticality,
        owner: updateActivityDto.owner,
        validation: updateActivityDto.validation,
        volume: updateActivityDto.volume,
        frequency: updateActivityDto.frequency,
        location: updateActivityDto.location,
        status: updateActivityDto.status,
        tags: updateActivityDto.tags.split(','),
        updatedAt: new Date(),
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
