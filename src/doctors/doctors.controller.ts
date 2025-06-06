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
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwtStrategy/jwt-auth.guard';
import { RolesGuard } from '../auth/Roles/roles.guard';
import { Roles } from '../auth/Roles/roles.decorator';

@ApiTags('doctors')
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Post()
  @ApiOperation({ summary: 'Create a new doctor (admin only)' })
  @ApiResponse({ status: 201, description: 'Doctor successfully created.' })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiResponse({ status: 200, description: 'List of doctors returned.' })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get('search')
  @ApiOperation({
    summary: 'Search doctors by query (name, lastname, email, phone)',
  })
  @ApiQuery({
    name: 'query',
    required: true,
    description: 'Query string for searching doctors',
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
    @Query('query') query: string,
    @Query('sortBy') sortBy?: string,
    @Query('order') order?: 'ASC' | 'DESC',
  ) {
    if (!query) {
      throw new BadRequestException('Doctor with this query not found');
    }
    return this.doctorsService.searchDoctor(query, sortBy, order);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor by id' })
  @ApiParam({ name: 'id', description: 'Doctor id', type: Number })
  @ApiResponse({ status: 200, description: 'Doctor found and returned.' })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  findById(@Param('id') id: number) {
    return this.doctorsService.findById(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Patch(':id')
  @ApiOperation({ summary: 'Update doctor by id (admin only)' })
  @ApiParam({ name: 'id', description: 'Doctor id', type: Number })
  @ApiResponse({ status: 200, description: 'Doctor updated successfully.' })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  update(@Param('id') id: number, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Remove doctor by id (admin only)' })
  @ApiParam({ name: 'id', description: 'Doctor id', type: Number })
  @ApiResponse({ status: 200, description: 'Doctor removed successfully.' })
  @ApiResponse({ status: 404, description: 'Doctor not found.' })
  remove(@Param('id') id: number) {
    return this.doctorsService.remove(+id);
  }
}
