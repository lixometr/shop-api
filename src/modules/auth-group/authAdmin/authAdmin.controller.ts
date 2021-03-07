import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from 'src/internal';
import { AuthAdminService } from './authAdmin.service';
import { JwtAuthAdminGuard } from './guards/jwt-authAdmin.guard';
import { LocalAuthAdminGuard } from './guards/local-authAdmin.guard';
import { SignupAdminDto } from './dto/signupAdmin.dto';
import { HasAdminRoles } from "src/decorators/role.decorator"
import { AdminRoles } from 'src/modules/user-group/userAdmin/userAdmin.types';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthAdmin } from "src/decorators/authAdmin.decorator"
import { GetRequestPayload } from 'src/internal';
import { RequestPayload } from 'src/internal';
import { ResOk } from 'src/internal';
@Controller('auth-admin')
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) { }

  @UseGuards(LocalAuthAdminGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authAdminService.login(req.user)
  }

  @Post('signup')
  async signup(@Body() data: SignupAdminDto, @GetRequestPayload() requestPayload: RequestPayload) {
    return this.authAdminService.signup(data, requestPayload)
  }

  

  @AuthAdmin()
  @Get('check')
  check() {
    return new ResOk()
  }


}
