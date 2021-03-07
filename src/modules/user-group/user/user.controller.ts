import { Controller, Get, Post, Body, Put, Param, Delete, SerializeOptions } from '@nestjs/common';
import { UserService } from './user.service';
import { ControllerBlueprint } from 'src/blueprints/controller';
import { AuthAdmin, GetRequestPayload, ID, RequestPayload, SerializeGroup } from 'src/internal';

@Controller('user')
export class UserController extends ControllerBlueprint {
  constructor(private readonly userService: UserService) { super(userService) }
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
    return await this.userService.findById({ id }, requestPayload);
  }
}
