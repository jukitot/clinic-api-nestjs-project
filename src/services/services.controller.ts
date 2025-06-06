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
import { MedicalServicesService } from './services.service';
import { CreateMedicalServiceDto } from './dto/create-service.dto';
import { UpdateMedicalServiceDto } from './dto/update-service.dto';
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

@ApiTags('services')
@Controller('services')
export class MedicalServicesController {
  constructor(private readonly servicesService: MedicalServicesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new medical service (admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Medical service created successfully.',
  })
  create(@Body() createServiceDto: CreateMedicalServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all medical services' })
  @ApiResponse({
    status: 200,
    description: 'List of medical services returned.',
  })
  findAll() {
    return this.servicesService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search medical services by name' })
  @ApiQuery({
    name: 'name',
    required: true,
    description: 'Name of the service to search',
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
      throw new BadRequestException('Service with this name not found');
    }
    return this.servicesService.searchByName(name, sortBy, order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get medical service by ID' })
  @ApiParam({
    name: 'id',
    description: 'ID of the medical service',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Medical service found and returned.',
  })
  @ApiResponse({ status: 404, description: 'Medical service not found.' })
  findOne(@Param('id') id: number) {
    return this.servicesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update medical service by ID (admin only)' })
  @ApiParam({
    name: 'id',
    description: 'ID of the medical service',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Medical service updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Medical service not found.' })
  update(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateMedicalServiceDto,
  ) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Remove medical service by ID (admin only)' })
  @ApiParam({
    name: 'id',
    description: 'ID of the medical service',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Medical service removed successfully.',
  })
  @ApiResponse({ status: 404, description: 'Medical service not found.' })
  remove(@Param('id') id: number) {
    return this.servicesService.remove(+id);
  }
}
