import { CatResponse } from './response/cat.response';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CatRepository } from './cat.repository';
import { Cat } from './entity/cat.entity';
import { TransformPlainToInstance } from 'class-transformer';

@Injectable()
export class CatService {
  constructor(private readonly catRepository: CatRepository) {}

  @TransformPlainToInstance(CatResponse)
  async findAll(): Promise<CatResponse[]> {
    return this.catRepository.findAll();
  }

  @TransformPlainToInstance(CatResponse)
  async findOne(id: ObjectId): Promise<CatResponse> {
    return this.catRepository.findOne(id);
  }

  @TransformPlainToInstance(CatResponse)
  async create(catRequest: Partial<Cat>): Promise<CatResponse> {
    const cat = new Cat(catRequest);
    return this.catRepository.create(cat);
  }

  @TransformPlainToInstance(CatResponse)
  async update(id: ObjectId, catRequest: Partial<Cat>): Promise<CatResponse> {
    const cat = new Cat(catRequest);
    return this.catRepository.update(id, cat);
  }

  async delete(id: ObjectId): Promise<void> {
    await this.catRepository.delete(id);
  }
}
