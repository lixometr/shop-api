import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserAdminService } from './userAdmin.service';
import { ControllerBlueprint } from 'src/blueprints/controller';

@Controller('userAdmin')
export class UserAdminController extends ControllerBlueprint{
  constructor(private readonly userAdminService: UserAdminService) {super(userAdminService)}

  
}
