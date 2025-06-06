import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { CreateClinicDto } from './dto/create-clinic.dto';

import { UpdateClinicDto } from './dto/update-clinic.dto';
import { JwtAuthGuard } from '../auth/jwtStrategy/jwt-auth.guard';
import { RolesGuard } from '../auth/Roles/roles.guard';
import { Roles } from '../auth/Roles/roles.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('clinics')
@Controller('clinics')
export class ClinicsController {
  constructor(private readonly clinicsService: ClinicsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new clinic (admin only)' })
  @ApiResponse({ status: 201, description: 'Clinic successfully created.' })
  create(@Body() dto: CreateClinicDto) {
    return this.clinicsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all clinics' })
  @ApiResponse({ status: 200, description: 'List of clinics returned.' })
  findAll() {
    return this.clinicsService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search clinics by name with optional sorting' })
  @ApiQuery({
    name: 'name',
    required: true,
    description: 'Clinic name to search for',
  })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    description: 'Field to sort by',
  })
  @ApiQuery({
    name: 'order',
    required: false,
    enum: ['ASC', 'DESC'],
    description: 'Sort order',
  })
  async search(
    @Query('name') name: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'ASC' | 'DESC',
  ) {
    if (!name) {
      throw new BadRequestException('Clinic with this name not found');
    }
    return this.clinicsService.searchByName(name, sortBy, order);
  }

  @Get('search-by-service')
  @ApiOperation({ summary: 'Search clinics by service name' })
  @ApiQuery({
    name: 'name',
    required: true,
    description: 'Service name to search by',
  })
  async searchByService(@Query('name') name: string) {
    if (!name) {
      throw new BadRequestException('Specialization name is required');
    }
    return this.clinicsService.searchByService(name);
  }

  @Get('search-by-doctor')
  @ApiOperation({ summary: 'Search clinics by doctor name' })
  @ApiQuery({
    name: 'name',
    required: true,
    description: 'Doctor name to search by',
  })
  async searchByDoctorName(@Query('name') name: string) {
    return this.clinicsService.searchByDoctorName(name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a clinic by id' })
  @ApiParam({ name: 'id', description: 'Clinic id', type: Number })
  @ApiResponse({ status: 200, description: 'Clinic found and returned.' })
  @ApiResponse({ status: 404, description: 'Clinic not found.' })
  findOne(@Param('id') id: string) {
    return this.clinicsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update clinic by id (admin only)' })
  @ApiParam({ name: 'id', description: 'Clinic id', type: Number })
  @ApiResponse({ status: 200, description: 'Clinic updated successfully.' })
  @ApiResponse({ status: 404, description: 'Clinic not found.' })
  update(@Param('id') id: string, @Body() updateClinicDto: UpdateClinicDto) {
    return this.clinicsService.update(+id, updateClinicDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Remove clinic by id (admin only)' })
  @ApiParam({ name: 'id', description: 'Clinic id', type: Number })
  @ApiResponse({ status: 200, description: 'Clinic removed successfully.' })
  @ApiResponse({ status: 404, description: 'Clinic not found.' })
  remove(@Param('id') id: string) {
    return this.clinicsService.remove(+id);
  }
}
