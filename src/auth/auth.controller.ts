import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { MailService } from '../mailService/mail.service';
import * as crypto from 'crypto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Request password reset link' })
  @ApiResponse({
    status: 200,
    description: 'Password reset link sent if email exists.',
  })
  async forgotPassword(@Body('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return {
        message: 'If your email is registered, a reset link will be sent.',
      };
    }
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);
    await this.userService.save(user);

    await this.mailService.sendPasswordResetEmail(email, token);

    return {
      message: 'If your email is registered, a reset link will be sent.',
    };
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({
    status: 200,
    description: 'Password has been reset successfully.',
  })
  async resetPassword(@Body() body: ResetPasswordDto) {
    const user = await this.userService.findByResetToken(body.token);
    if (!user) {
      return { message: 'Invalid or expired reset token.' };
    }

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      return { message: 'Reset token has expired.' };
    }

    user.password = await this.authService.hashPassword(body.newPassword);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await this.userService.save(user);

    return { message: 'Password has been reset successfully.' };
  }
}
