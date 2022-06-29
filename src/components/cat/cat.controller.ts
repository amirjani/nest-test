import { CatResponse } from './response/cat.response';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CatService } from './cat.service';
import { CatRequest } from './request/cat.request';

@Controller(CatController.path)
export class CatController {
  static path = '/cats';

  constructor(private readonly catService: CatService) {}

  @Get()
  async findAll(): Promise<CatResponse[]> {
    return this.catService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<CatResponse> {
    const idObject = new ObjectId(id);
    return this.catService.findOne(idObject);
  }

  @Post()
  async create(@Body() catRequest: CatRequest): Promise<CatResponse> {
    return this.catService.create(catRequest);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() catRequest: CatRequest,
  ): Promise<CatResponse> {
    return this.catService.update(new ObjectId(id), catRequest);
  }
}
