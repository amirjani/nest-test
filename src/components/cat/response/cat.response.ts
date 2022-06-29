import { Exclude, Expose, Type } from 'class-transformer';
import { ObjectId } from 'mongodb';

@Exclude()
export class CatResponse {
  @Expose()
  @Type(() => String)
  _id: ObjectId;

  @Expose()
  name: string;

  @Expose()
  age: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
