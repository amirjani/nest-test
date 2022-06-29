import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CatService } from './cat.service';
import { Cat } from './entity/cat.entity';

@Controller(CatController.path)
export class CatController {
  static path = '/cats';

  constructor(private readonly catService: CatService) {}

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    const idObject = new ObjectId(id);
    return this.catService.findOne(idObject);
  }

  @Post()
  async create(@Body() catRequest: Partial<Cat>): Promise<Cat> {
    const cat = new Cat(catRequest);
    return this.catService.create(cat);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() catRequest: Partial<Cat>,
  ): Promise<Cat> {
    return this.catService.update(new ObjectId(id), catRequest);
  }
}
