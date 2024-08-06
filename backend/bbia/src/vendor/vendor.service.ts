import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VendorService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVendorDto: CreateVendorDto) {
    return this.prisma.vendor.create({
      data: {
        name: createVendorDto.name,
        description: createVendorDto.description,
        contact: createVendorDto.contact,
        status: createVendorDto.status,
        tags:
          typeof createVendorDto.tags === 'string'
            ? createVendorDto.tags.split(',')
            : createVendorDto.tags,
        defaultRTO: +createVendorDto.defaultRTO,
        defaultRPO: +createVendorDto.defaultRPO,
      },
    });
  }

  findAll() {
    return this.prisma.vendor.findMany();
  }

  findOne(id: number) {
    return this.prisma.vendor.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateVendorDto: UpdateVendorDto) {
    return this.prisma.vendor.update({
      where: {
        id: id,
      },
      data: {
        name: updateVendorDto.name,
        description: updateVendorDto.description,
        contact: updateVendorDto.contact,
        status: updateVendorDto.status,
        tags:
          typeof updateVendorDto.tags === 'string'
            ? updateVendorDto.tags.split(',')
            : updateVendorDto.tags,
        defaultRTO: +updateVendorDto.defaultRTO,
        defaultRPO: +updateVendorDto.defaultRPO,
        updatedAt: new Date(),
      },
    });
  }

  remove(id: number) {
    return this.prisma.vendor.delete({
      where: {
        id: id,
      },
    });
  }
}
