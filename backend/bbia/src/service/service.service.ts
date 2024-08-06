import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  create(createServiceDto: CreateServiceDto) {
    const activitiesSpecificIdNumber: number[] =
      createServiceDto.activitiesSpecificId.split(',').map(Number);
    return this.prisma.service.create({
      data: {
        vendor: {
          connect: { id: createServiceDto.vendorId },
        },
        activityspecific: {
          connect: activitiesSpecificIdNumber.map((id) => ({ id })),
        },
        name: createServiceDto.name,
        description: createServiceDto.description,
        owner: createServiceDto.owner,
        status: createServiceDto.status,
        location: createServiceDto.location,
        RTO: +createServiceDto.RTO,
        RPO: +createServiceDto.RPO,
        tags:
          typeof createServiceDto.tags === 'string'
            ? createServiceDto.tags.split(',')
            : createServiceDto.tags,
      },
      include: {
        vendor: true,
        activityspecific: true,
      },
    });
  }

  findAll() {
    return this.prisma.service.findMany({
      include: {
        vendor: true,
        activityspecific: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.service.findUnique({
      where: {
        id: id,
      },
      include: {
        vendor: true,
        activityspecific: true,
      },
    });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    const activitiesSpecificIdNumber: number[] =
      updateServiceDto.activitiesSpecificId?.split(',').map(Number);
    return this.prisma.service.update({
      where: {
        id: id,
      },
      include: {
        vendor: true,
        activityspecific: true,
      },
      data: {
        vendor: {
          connect: { id: updateServiceDto.vendorId },
        },
        activityspecific: {
          set: activitiesSpecificIdNumber?.map((id) => ({ id })),
        },
        name: updateServiceDto.name,
        description: updateServiceDto.description,
        owner: updateServiceDto.owner,
        status: updateServiceDto.status,
        location: updateServiceDto.location,
        RTO: +updateServiceDto.RTO,
        RPO: +updateServiceDto.RPO,
        tags:
          typeof updateServiceDto.tags === 'string'
            ? updateServiceDto.tags.split(',')
            : updateServiceDto.tags,
        updatedAt: new Date(),
      },
    });
  }

  remove(id: number) {
    return this.prisma.service.delete({
      where: {
        id: id,
      },
    });
  }
}
