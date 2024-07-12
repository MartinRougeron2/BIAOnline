import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { CompleteActivityDto } from './dto/complete-activity.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly prisma: PrismaService) {}

  create(createActivityDto: CreateActivityDto) {
    return this.prisma.activity.create({
      data: {
        RPO: 0,
        RTO: 0,
        ...createActivityDto,
      }
    });
  }

  complete(completeActivityDto: CompleteActivityDto) {
    return this.prisma.activity.update({
      where: {
        id: completeActivityDto.id,
      },
      data: {
        RTO: completeActivityDto.RTO,
        RPO: completeActivityDto.RPO,
      },
    });
  }

  findAll() {
    return this.prisma.activity.findMany();
  }

  findOne(id: number) {
    return this.prisma.activity.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return this.prisma.activity.update({
      where: {
        id: id,
      },
      data: updateActivityDto,
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
