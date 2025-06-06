import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MedicalService } from '../../services/entities/service.entity';
import { Clinic } from '../../clinics/entities/clinic.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column({ nullable: true, unique: true })
  phone: string;
  @Column({ nullable: true, unique: true })
  email: string;
  @ManyToMany(() => Clinic, (clinic) => clinic.doctors)
  clinics: Clinic[];
  @ManyToMany(() => MedicalService, (service) => service.doctors, {
    cascade: true,
  })
  @JoinTable()
  services: MedicalService[];
}
