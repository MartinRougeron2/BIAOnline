import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServiceService {
  constructor(private readonly prisma: PrismaService) {}

  create(createServiceDto: CreateServiceDto) {
    const activitiesSpecificIdNumber: number[] =
      createServiceDto.activitiesSpecificId.map(Number);
    return this.prisma.service.create({
      data: {
        Vendor: {
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
        RTO: createServiceDto.RTO,
        RPO: createServiceDto.RPO,
        tags: createServiceDto.tags,
      },
    });
  }

  findAll() {
    return this.prisma.service.findMany();
  }

  findOne(id: number) {
    return this.prisma.service.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    const activitiesSpecificIdNumber: number[] =
      updateServiceDto.activitiesSpecificId.map(Number);
    return this.prisma.service.update({
      where: {
        id: id,
      },
      data: {
        Vendor: {
          connect: { id: updateServiceDto.vendorId },
        },
        activityspecific: {
          set: activitiesSpecificIdNumber.map((id) => ({ id })),
        },
        name: updateServiceDto.name,
        description: updateServiceDto.description,
        owner: updateServiceDto.owner,
        status: updateServiceDto.status,
        location: updateServiceDto.location,
        RTO: updateServiceDto.RTO,
        RPO: updateServiceDto.RPO,
        tags: updateServiceDto.tags,
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
