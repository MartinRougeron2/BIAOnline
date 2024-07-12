import { Injectable } from '@nestjs/common';
import { CreateImpactDto } from './dto/create-impact.dto';
import { UpdateImpactDto } from './dto/update-impact.dto';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ImpactService {
  constructor(private readonly prisma: PrismaService) {}

  create(createImpactDto: CreateImpactDto) {
    return this.prisma.impact.create({
      data: createImpactDto,
    });
  }

  findAll() {
    return this.prisma.impact.findMany();
  }

  findOne(id: number) {
    return this.prisma.impact.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateImpactDto: UpdateImpactDto) {
    return this.prisma.impact.update({
      where: {
        id: id,
      },
      data: updateImpactDto,
    });
  }

  remove(id: number) {
    return this.prisma.impact.delete({
      where: {
        id: id,
      },
    });
  }
}
