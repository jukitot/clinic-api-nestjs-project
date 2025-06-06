import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMedicalServiceDto } from './dto/create-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MedicalService } from './entities/service.entity';
import { ILike, Repository } from 'typeorm';
import { UpdateMedicalServiceDto } from './dto/update-service.dto';

@Injectable()
export class MedicalServicesService {
  constructor(
    @InjectRepository(MedicalService)
    private serviceRepository: Repository<MedicalService>,
  ) {}

  async create(dto: CreateMedicalServiceDto): Promise<MedicalService> {
    const newService = this.serviceRepository.create(dto);
    return this.serviceRepository.save(newService);
  }

  async findAll(): Promise<MedicalService[]> {
    return this.serviceRepository.find({ relations: ['doctors'] });
  }

  async findOne(id: number): Promise<MedicalService> {
    const service = await this.serviceRepository.findOne({
      where: { id },
      relations: ['doctors'],
    });
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return service;
  }

  async searchByName(
    name: string,
    sortBy?: string,
    order?: 'ASC' | 'DESC',
  ): Promise<MedicalService[]> {
    const option: any = {
      where: {
        name: ILike(`%${name}%`),
      },
    };

    const allowedSortField = ['name'];
    if (sortBy && !allowedSortField.includes(sortBy)) {
      throw new BadRequestException(`Invalid sortBy field: ${sortBy}`);
    }

    if (sortBy && order) {
      option.order = { [sortBy]: order };
    }
    return this.serviceRepository.find(option);
  }

  async update(
    id: number,
    dto: UpdateMedicalServiceDto,
  ): Promise<MedicalService> {
    const service = await this.findOne(id);
    Object.assign(service, dto);
    return this.serviceRepository.save(service);
  }

  async remove(id: number): Promise<void> {
    const service = await this.findOne(id);
    await this.serviceRepository.remove(service);
  }
}
