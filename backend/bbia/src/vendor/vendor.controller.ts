import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Vendor } from './entities/vendor.entity';

@Controller('vendors')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  @ApiResponse({ status: 201, type: Vendor })
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [Vendor] })
  findAll() {
    return this.vendorService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Vendor })
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: Vendor })
  update(@Param('id') id: string, @Body() updateVendorDto: UpdateVendorDto) {
    return this.vendorService.update(+id, updateVendorDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: Vendor })
  remove(@Param('id') id: string) {
    return this.vendorService.remove(+id);
  }
}
