import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { CatRepository } from './cat.repository';
import { Cat } from './entity/cat.entity';

@Injectable()
export class CatService {
  constructor(private readonly catRepository: CatRepository) {}

  async findAll(): Promise<Cat[]> {
    return this.catRepository.findAll();
  }

  async findOne(id: ObjectId): Promise<Cat> {
    return this.catRepository.findOne(id);
  }

  async create(catRequest: Partial<Cat>): Promise<Cat> {
    const cat = new Cat(catRequest);
    return this.catRepository.create(cat);
  }

  async update(id: ObjectId, catRequest: Partial<Cat>): Promise<Cat> {
    const cat = new Cat(catRequest);
    return this.catRepository.update(id, cat);
  }

  async delete(id: ObjectId): Promise<void> {
    await this.catRepository.delete(id);
  }
}
