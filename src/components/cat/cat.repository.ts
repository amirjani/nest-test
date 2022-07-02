import { Injectable } from "@nestjs/common";
import { Collection, ObjectId } from "mongodb";
import { InjectCollection } from "nest-mongodb";
import { Cat } from "./entity/cat.entity";

@Injectable()
export class CatRepository {
  constructor(
    @InjectCollection(Cat.name) private readonly catCollection: Collection<Cat>
  ) {}

  async findAll(): Promise<Cat[]> {
    const catResult = this.catCollection.find();
    return catResult.toArray();
  }

  async findOne(id: ObjectId): Promise<Cat> {
    return this.catCollection.findOne({ _id: id });
  }

  async create(cat: Cat): Promise<Cat> {
    const insertedCatId = (await this.catCollection.insertOne(cat)).insertedId;
    return this.findOne(insertedCatId);
  }

  async update(id: ObjectId, cat: Cat): Promise<Cat> {
    const result = await (
      await this.catCollection.findOneAndUpdate({ _id: id }, cat)
    ).value;
    return result;
  }

  async delete(id: ObjectId): Promise<void> {
    await this.catCollection.findOneAndDelete({ _id: id });
  }
}
