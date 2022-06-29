import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatResponse } from './response/cat.response';

describe('Cat Controller', () => {
  let catController: CatController;
  const catResponseInstance: CatResponse[] = [
    {
      _id: new ObjectId(),
      name: 'first test',
      age: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId(),
      name: 'second test',
      age: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [
        {
          provide: CatService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(catResponseInstance),
            findOne: jest.fn().mockResolvedValue(catResponseInstance[0]),
            create: jest.fn().mockResolvedValue(catResponseInstance[0]),
            update: jest.fn().mockResolvedValue(catResponseInstance[0]),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    catController = moduleRef.get<CatController>(CatController);
  });

  it('should be defined', () => {
    expect(catController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const cats = await catController.findAll();
      expect(cats).toEqual(catResponseInstance);
      expect(cats[0]._id).toBeInstanceOf(ObjectId);
      expect(cats[0].createdAt).toBeInstanceOf(Date);
      expect(cats[0].updatedAt).toBeInstanceOf(Date);
      expect(cats[0].name).toBe(catResponseInstance[0].name);
    });
  });

  describe('findOne', () => {
    it('should return a cat', async () => {
      const cat = await catController.findOne(
        catResponseInstance[0]._id.toString(),
      );
      expect(cat).toEqual(catResponseInstance[0]);
      expect(cat._id).toBeInstanceOf(ObjectId);
      expect(cat.createdAt).toBeInstanceOf(Date);
      expect(cat.updatedAt).toBeInstanceOf(Date);
      expect(cat.name).toBe(catResponseInstance[0].name);
    });
  });

  describe('create', () => {
    it('should create a cat', async () => {
      const cat = await catController.create(catResponseInstance[0]);
      expect(cat).toEqual(catResponseInstance[0]);
      expect(cat._id).toBeInstanceOf(ObjectId);
      expect(cat.createdAt).toBeInstanceOf(Date);
      expect(cat.updatedAt).toBeInstanceOf(Date);
      expect(cat.name).toBe(catResponseInstance[0].name);
    });
  });

  describe('update', () => {
    it('should update a cat', async () => {
      const cat = await catController.update(
        catResponseInstance[0]._id.toString(),
        catResponseInstance[0],
      );
      expect(cat).toEqual(catResponseInstance[0]);
      expect(cat._id).toBeInstanceOf(ObjectId);
      expect(cat.createdAt).toBeInstanceOf(Date);
      expect(cat.updatedAt).toBeInstanceOf(Date);
      expect(cat.name).toBe(catResponseInstance[0].name);
    });
  });

  describe('delete', () => {
    it('should delete a cat', async () => {
      const cat = await catController.delete(
        catResponseInstance[0]._id.toString(),
      );
      expect(cat).toEqual(undefined);
    });
  });
});
