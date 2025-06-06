import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMedicalServiceDto {
  @ApiProperty({ example: 'Pediatry' })
  @IsString()
  name: string;
}
