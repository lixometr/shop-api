import { Body, Controller, Get, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignupDto } from './dto/signup.dto';
import { Auth } from 'src/decorators/auth.decorator';
import { AuthRequest, ResOk } from 'src/internal';
import { GetRequestPayload } from 'src/internal';
import { RequestPayload } from 'src/internal';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user)
  }

  @Post('signup')
  async signup(@Body() data: SignupDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.authService.signup(data, requestPayload)
  }

  @Get('confirm/:key')
  async confirm(@Param('key') key: string): Promise<ResOk> {
    await this.authService.confirmUser(key)
    return new ResOk
  }

  @Auth()
  @Get('test')
  async test(@Request() req: AuthRequest) {
    return req.user
  }


}
