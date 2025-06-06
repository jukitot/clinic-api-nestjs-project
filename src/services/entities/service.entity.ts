import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from '../../doctors/entities/doctor.entity';

@Entity()
export class MedicalService {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @ManyToMany(() => Doctor, (doctor) => doctor.services)
  doctors: Doctor[];
}
