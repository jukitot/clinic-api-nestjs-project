import { IsArray, IsInt, IsString } from 'class-validator';

export class CreateClinicDto {
  @IsString()
  name: string;

  @IsArray()
  @IsInt({each: true})
  doctorIds: number[];
}