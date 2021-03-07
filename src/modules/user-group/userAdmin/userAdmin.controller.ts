import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { UserAdminService } from './userAdmin.service';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, GetRequestPayload, ID, RequestPayload } from 'src/internal';
import { SerializeGroup } from 'src/internal';

@Controller('user-admin')
export class UserAdminController extends ControllerBlueprint{
  constructor(private readonly userAdminService: UserAdminService) {super(userAdminService)}

  findBySlug() { return null }
  findBySlugAdmin() { return null }
  search() { return null }
  searchAll() { return null }
  
  @AuthAdmin()
  @SerializeOptions({ groups: [SerializeGroup.Full, SerializeGroup.Translate] })
  @Get('id/:id')
  async findById(
    @Param('id') id: ID,
    @GetRequestPayload() requestPayload: RequestPayload,
  ): Promise<any> {
    return await this.userAdminService.findById({ id }, requestPayload);
  }
}
