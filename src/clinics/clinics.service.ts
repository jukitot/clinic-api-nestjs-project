import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from './entities/clinic.entity';
import { ILike, In, Repository } from 'typeorm';
import { Doctor } from '../doctors/entities/doctor.entity';
import { UpdateClinicDto } from './dto/update-clinic.dto';

@Injectable()
export class ClinicsService {
  constructor(
    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
  ) {}

  async create(dto: CreateClinicDto) {
    const doctors = await this.doctorRepository.find({
      where: {
        id: In(dto.doctorIds),
      },
    });
    const clinic = this.clinicRepository.create({
      name: dto.name,
      doctors,
    });
    return this.clinicRepository.save(clinic);
  }

  findAll() {
    return this.clinicRepository.find({ relations: ['doctors'] });
  }

  async findOne(id: number) {
    const clinic = await this.clinicRepository.findOne({
      where: { id },
      relations: ['doctors'],
    });
    if (!clinic) {
      throw new NotFoundException('Clinic is not found!');
    }
    return clinic;
  }

  async searchByName(
    name: string,
    sortBy?: string,
    order?: 'ASC' | 'DESC',
  ): Promise<Clinic[]> {
    const option: any = {
      where: {
        name: ILike(`%${name}%`),
      },
    };

    const allowedSortFields = ['name'];
    if (sortBy && !allowedSortFields.includes(sortBy)) {
      throw new BadRequestException(`Invalid sortBy field: ${sortBy}`);
    }

    if (sortBy && order) {
      option.order = { [sortBy]: order };
    }
    return this.clinicRepository.find(option);
  }

  async searchByService(name: string): Promise<Clinic[]> {
    return this.clinicRepository
      .createQueryBuilder('clinic')
      .leftJoinAndSelect('clinic.doctors', 'doctor')
      .leftJoinAndSelect('doctor.services', 'services')
      .where('LOWER(services.name) LIKE LOWER(:name)', { name: `%${name}%` })
      .getMany();
  }

  async searchByDoctorName(name: string): Promise<Clinic[]> {
    return this.clinicRepository
      .createQueryBuilder('clinic')
      .leftJoinAndSelect('clinic.doctors', 'doctor')
      .where(
        'LOWER(doctor.firstName) LIKE LOWER(:name) OR LOWER(doctor.lastName) LIKE LOWER(:name)',
        { name: `%${name}%` },
      )
      .getMany();
  }

  async update(id: number, dto: UpdateClinicDto): Promise<Clinic> {
    const clinic = await this.findOne(id);

    if (dto.doctorIds) {
      const doctors = await this.doctorRepository.findBy({
        id: In(dto.doctorIds),
      });
      clinic.doctors = doctors;
    }
    Object.assign(clinic, dto);
    return this.clinicRepository.save(clinic);
  }

  async remove(id: number): Promise<void> {
    const clinic = await this.findOne(id);
    await this.clinicRepository.remove(clinic);
  }
}
