import { ObjectId } from 'mongodb';

export class Cat {
  _id: ObjectId;
  name: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(cat: Partial<Cat>) {
    this.createdAt = new Date();
    return Object.assign(this, cat);
  }
}
