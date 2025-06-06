import { Module } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicsController } from './clinics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from './entities/clinic.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { RolesGuard } from '../auth/Roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic, Doctor])],
  controllers: [ClinicsController],
  providers: [ClinicsService, RolesGuard],
})
export class ClinicsModule {}
