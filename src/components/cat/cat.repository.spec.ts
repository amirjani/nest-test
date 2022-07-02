import { createMock } from "@golevelup/ts-jest";
import { Test, TestingModule } from "@nestjs/testing";
import { exec } from "child_process";
import { Collection, FindCursor, ObjectId } from "mongodb";
import { getCollectionToken } from "nest-mongodb";
import { CatRepository } from "./cat.repository";
import { Cat } from "./entity/cat.entity";

const mockCat = (
  _id = new ObjectId("62bc1b1c92e1568d308d393c"),
  name = "Mock Cat",
  age = 1,
  createdAt: Date = new Date(),
  updatedAt: Date = new Date()
): Cat => ({
  _id,
  name,
  age,
  createdAt,
  updatedAt,
});

const mockCatDoc = (mock?: Partial<Cat>): Partial<Cat> => ({
  _id: mock?._id || new ObjectId("62bc1b1c92e1568d308d393c"),
  name: mock?.name || "Mock Cat",
  age: mock?.age || 1,
  createdAt: mock?.createdAt || new Date(),
  updatedAt: mock?.updatedAt || new Date(),
});

const catDocArray = [
  mockCatDoc(),
  mockCatDoc({
    name: "Mock Cat 2",
    age: 2,
    _id: new ObjectId("62bc1b1c92e1568d308d393a"),
  }),
  mockCatDoc({
    name: "Mock Cat 3",
    age: 3,
    _id: new ObjectId("62bc1b1c92e1568d308d393b"),
  }),
];

describe("Cat Repository", () => {
  let catRepository: CatRepository;
  let catCollection: Collection<Cat>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatRepository,
        {
          provide: getCollectionToken(Cat.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockCatDoc()),
            constructor: jest.fn().mockResolvedValue(mockCatDoc()),
            find: jest.fn(),
            findOne: jest.fn(),
            insertOne: jest.fn(),
            findOneAndDelete: jest.fn(),
            exec: jest.fn(),
            findOneAndUpdate: jest.fn(),
          },
        },
      ],
    }).compile();

    catRepository = module.get<CatRepository>(CatRepository);
    catCollection = module.get<Collection<Cat>>(getCollectionToken(Cat.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(catRepository).toBeDefined();
  });

  describe("findAll", () => {
    it("should return all cats", async () => {
      jest.spyOn(catCollection, "find").mockReturnValue({
        toArray: jest.fn().mockResolvedValueOnce(catDocArray),
      } as unknown as FindCursor);

      const cats = await catRepository.findAll();
      expect(cats).toEqual(catDocArray);
      expect(catCollection.find).toHaveBeenCalledTimes(1);
      expect(cats.length).toEqual(3);
    });
  });

  describe("findOne", () => {
    it("should return a cat", async () => {
      jest.spyOn(catCollection, "findOne").mockReturnValue(mockCatDoc() as any);

      const cat = await catRepository.findOne(
        new ObjectId("62bc1b1c92e1568d308d393c")
      );
      expect(cat).toEqual(mockCatDoc());
      expect(catCollection.findOne).toHaveBeenCalledTimes(1);
      expect(cat.name).toEqual(catDocArray[0].name);
    });
  });

  describe("create", () => {
    it("should create a cat", async () => {
      const newCatToInsert: Cat = {
        _id: new ObjectId("62bc1b1c92e1568d308d393a"),
        name: "Mock Cat 3",
        age: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(catCollection, "insertOne").mockReturnValueOnce({
        insertedId: newCatToInsert._id,
      } as any);

      jest.spyOn(catCollection, "findOne").mockReturnValueOnce(
        mockCatDoc({
          _id: newCatToInsert._id,
          name: newCatToInsert.name,
          age: newCatToInsert.age,
          createdAt: newCatToInsert.createdAt,
          updatedAt: newCatToInsert.updatedAt,
        }) as any
      );

      const cat = await catRepository.create(newCatToInsert);

      expect(cat).toEqual(newCatToInsert);
      expect(catCollection.insertOne).toHaveBeenCalledTimes(1);
      expect(cat.name).toEqual(newCatToInsert.name);
    });
  });

  describe("update", () => {
    it("should update a cat", async () => {
      const catToUpdate: Cat = {
        _id: new ObjectId("62bc1b1c92e1568d308d393c"),
        name: "Mock Cat Updated",
        age: 1000,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(catCollection, "findOneAndUpdate").mockReturnValueOnce({
        value: mockCatDoc({
          _id: catToUpdate._id,
          name: catToUpdate.name,
          age: catToUpdate.age,
          createdAt: catToUpdate.createdAt,
          updatedAt: catToUpdate.updatedAt,
        }),
      } as any);

      const cat = await catRepository.update(catToUpdate._id, catToUpdate);

      expect(cat).toEqual(catToUpdate);
      expect(catCollection.findOneAndUpdate).toHaveBeenCalledTimes(1);
      expect(cat.name).toEqual(catToUpdate.name);
    });
  });

  describe("delete", () => {
    it("should delete a cat", async () => {
      jest.spyOn(catCollection, "findOneAndDelete").mockReturnValueOnce({
        ok: 1,
      } as any);

      await catRepository.delete(new ObjectId("62bc1b1c92e1568d308d393c"));
      expect(catCollection.findOneAndDelete).toHaveBeenCalledTimes(1);
    });
  });
});
