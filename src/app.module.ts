import { CatModule } from './components/cat/cat.module';
import { Module } from '@nestjs/common';
import { MongoModule } from 'nest-mongodb';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongoModule.forRoot('mongodb://localhost:27017', 'NestTest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    CatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
