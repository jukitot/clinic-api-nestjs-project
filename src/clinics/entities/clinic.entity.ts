import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Doctor } from '../../doctors/entities/doctor.entity';

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @ManyToMany(() => Doctor, (doctor) => doctor.clinics, { cascade: true })
  @JoinTable()
  doctors: Doctor[];
}
