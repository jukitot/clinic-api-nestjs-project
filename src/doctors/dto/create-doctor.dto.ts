import { IsArray, IsIn, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDoctorDto {
  @ApiProperty({ example: 'Alexandr' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Petrenko' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '+3809999056' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'user@example.com' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  clinicIds?: number[];

  @ApiProperty({ example: [1, 2, 3] })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  serviceIds?: number[];
}
