import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { ILike, In, Repository } from 'typeorm';
import { Clinic } from '../clinics/entities/clinic.entity';
import { MedicalService } from '../services/entities/service.entity';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,

    @InjectRepository(Clinic)
    private clinicRepository: Repository<Clinic>,

    @InjectRepository(MedicalService)
    private serviceRepository: Repository<MedicalService>,
  ) {}

  async create(dto: CreateDoctorDto): Promise<Doctor> {
    const { clinicIds = [], serviceIds = [], ...doctorData } = dto;
    const clinics =
      clinicIds.length > 0
        ? await this.clinicRepository.findBy({ id: In(clinicIds) })
        : [];

    const services =
      serviceIds.length > 0
        ? await this.serviceRepository.findBy({ id: In(serviceIds) })
        : [];

    const doctor = this.doctorRepository.create({
      ...doctorData,
      clinics,
      services,
    });

    return this.doctorRepository.save(doctor);
  }

  async findAll(): Promise<Doctor[]> {
    return this.doctorRepository.find({ relations: ['clinics', 'services'] });
  }

  async findById(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { id },
      relations: ['clinics', 'services'],
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found!`);
    }
    return doctor;
  }

  async searchDoctor(
    query: string,
    sortBy?: string,
    order?: 'ASC' | 'DESC',
  ): Promise<Doctor[]> {
    const searchParams = [
      { firstName: ILike(`%${query}%`) },
      { lastName: ILike(`%${query}%`) },
      { email: ILike(`%${query}%`) },
      { phone: ILike(`%${query}%`) },
    ];
    const options: any = { where: searchParams };

    const allowedSortFields = ['firstName', 'lastName', 'email', 'phone'];
    if (sortBy && !allowedSortFields.includes(sortBy)) {
      throw new BadRequestException(`Invalid sortBy field: ${sortBy}`);
    }

    if (sortBy && order) {
      options.order = { [sortBy]: order };
    }
    return this.doctorRepository.find(options);
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.findById(id);

    if (updateDoctorDto.clinicIds) {
      const clinics = await this.clinicRepository.findBy({
        id: In(updateDoctorDto.clinicIds),
      });
      doctor.clinics = clinics;
    }
    if (updateDoctorDto.serviceIds) {
      const services = await this.serviceRepository.findBy({
        id: In(updateDoctorDto.serviceIds),
      });
      doctor.services = services;
    }

    Object.assign(doctor, updateDoctorDto);
    return this.doctorRepository.save(doctor);
  }

  async remove(id: number): Promise<void> {
    const doctor = await this.findById(id);
    await this.doctorRepository.remove(doctor);
  }
}
