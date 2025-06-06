import { IsArray, IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClinicDto {
  @ApiProperty({ example: 'Super Clinic' })
  @IsString()
  name: string;

  @ApiProperty({ example: [1, 2, 3] })
  @IsArray()
  @IsInt({ each: true })
  doctorIds: number[];
}
