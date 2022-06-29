import { CatRepository } from './cat.repository';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { MongoModule } from 'nest-mongodb';
import { Module } from '@nestjs/common';
import { Cat } from './entity/cat.entity';

@Module({
  imports: [MongoModule.forFeature([Cat.name])],
  controllers: [CatController],
  providers: [CatService, CatRepository],
  exports: [CatService],
})
export class CatModule {}
