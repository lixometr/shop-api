import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { ControllerBlueprint } from 'src/blueprints/controller';

@Controller('user')
export class UserController extends ControllerBlueprint{
  constructor(private readonly userService: UserService) {super(userService)}

  
}
