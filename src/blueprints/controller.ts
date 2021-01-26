import { Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe, UsePipes, UseInterceptors, SerializeOptions, Req } from '@nestjs/common';
import { AuthAdmin } from 'src/decorators/authAdmin.decorator';
import { RequestPayload } from 'src/helpers';
import { AuthRequest, ID, NoAuthRequest, SerializeGroup, SLUG, GetRequestPayload } from 'src/internal';
import { ServiceBlueprint } from './service';

@SerializeOptions({ groups: [SerializeGroup.Translate, SerializeGroup.Info] })
export class ControllerBlueprint {
    constructor(private readonly service: ServiceBlueprint<any>) { }

    @Post()
    async create(@Body() createDto, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
        return await this.service.create({ data: createDto, }, requestPayload)
    }

    @Get()
    async findAll(@GetRequestPayload() requestPayload?: RequestPayload): Promise<any> {
        return await this.service.findAll({}, requestPayload)
    }
    @SerializeOptions({ groups: [SerializeGroup.Full, SerializeGroup.Translate] })
    @Get('id/:id')
    async findById(@Param('id') id: ID, @GetRequestPayload() requestPayload?: RequestPayload): Promise<any> {
        return await this.service.findById({ id }, requestPayload)
    }

    @SerializeOptions({ groups: [SerializeGroup.Full, SerializeGroup.Translate] })
    @Get('slug/:slug')
    async findBySlug(@Param('slug') slug: SLUG, @GetRequestPayload() requestPayload?: RequestPayload): Promise<any> {
        return await this.service.findBySlug({ slug, }, requestPayload)
    }

    @SerializeOptions({ groups: [SerializeGroup.Full, SerializeGroup.Translate, SerializeGroup.Admin] }) 
    // @AuthAdmin()
    @Put('id/:id')
    async update(@Param('id') id: ID, @Body() updateDto: any, @GetRequestPayload() requestPayload?: RequestPayload): Promise<any> {
        return await this.service.updateById({ id, data: updateDto }, requestPayload)
    }

    // @AuthAdmin()
    @Delete('id/:id')
    async remove(@Param('id') id: ID, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
        return await this.service.removeById({ id }, requestPayload)
    }

    @AuthAdmin()
    @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.Full] })
    @Get('admin/id/:id')
    async findByIdAdmin(@Param('id') id: ID, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
        return this.service.findById({ id }, requestPayload)
    }

    @AuthAdmin()
    @SerializeOptions({ groups: [SerializeGroup.Admin, SerializeGroup.Full] })
    @Get('admin/slug/:slug')
    async findBySlugAdmin(@Param('slug') slug: SLUG, @GetRequestPayload() requestPayload: RequestPayload): Promise<any> {
        return this.service.findBySlug({ slug }, requestPayload)
    }
}
