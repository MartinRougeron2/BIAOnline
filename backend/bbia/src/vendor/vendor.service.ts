import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VendorService {
  constructor(private readonly prisma: PrismaService) {}

  create(createVendorDto: CreateVendorDto) {
    return this.prisma.vendor.create({
      data: createVendorDto,
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
      data: updateVendorDto,
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
