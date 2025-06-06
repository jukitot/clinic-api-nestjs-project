import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({ example: 't1dffg5ghhk7ls89dfd2l' })
  @IsString()
  token: string;

  @ApiProperty({ example: 'NewSuperP@ss11' })
  @IsString()
  newPassword: string;
}
