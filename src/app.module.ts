import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ClinicsModule } from './clinics/clinics.module';
import { DoctorsModule } from './doctors/doctors.module';
import { MedicalServicesModule } from './services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { MailModule } from './mailService/mail.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule,
    ClinicsModule,
    DoctorsModule,
    MedicalServicesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    MailModule,
  ],
})
export class AppModule {}
