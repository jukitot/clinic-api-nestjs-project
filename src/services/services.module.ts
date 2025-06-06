import { Module } from '@nestjs/common';
import { MedicalServicesController } from './services.controller';
import { MedicalServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalService } from './entities/service.entity';
import { RolesGuard } from '../auth/Roles/roles.guard';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalService])],
  controllers: [MedicalServicesController],
  providers: [MedicalServicesService, RolesGuard],
  exports: [MedicalServicesService],
})
export class MedicalServicesModule {}
