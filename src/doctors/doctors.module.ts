import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Clinic } from '../clinics/entities/clinic.entity';
import { MedicalService } from '../services/entities/service.entity';
import { RolesGuard } from '../auth/Roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, Clinic, MedicalService])],
  controllers: [DoctorsController],
  providers: [DoctorsService, RolesGuard],
})
export class DoctorsModule {}
