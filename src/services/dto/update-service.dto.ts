import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicalServiceDto } from './create-service.dto';

export class UpdateMedicalServiceDto extends PartialType(
  CreateMedicalServiceDto,
) {}
