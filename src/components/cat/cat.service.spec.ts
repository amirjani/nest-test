import { CatRepository } from './cat.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { ObjectId } from 'mongodb';
import { CatService } from './cat.service';
import { CatResponse } from './response/cat.response';

describe('Cat Service', () => {
  let catService: CatService;
  const catResponseInstance: CatResponse[] = [
    {
      _id: new ObjectId('62bc1b1c92e1568d308d393c'),
      name: 'first test',
      age: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      _id: new ObjectId('62bc1b1c92e1568d308d393a'),
      name: 'second test',
      age: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: CatRepository,
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

    catService = moduleRef.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(catService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const cats = await catService.findAll();

      expect(cats).toBeInstanceOf(Array);
      expect(cats[0].createdAt).toBeInstanceOf(Date);
      expect(cats[0].updatedAt).toBeInstanceOf(Date);
      expect(cats[0].name).toBe(catResponseInstance[0].name);
    });
  });

  describe('findOne', () => {
    it('should return a cat', async () => {
      const cat = await catService.findOne(catResponseInstance[0]._id);
      expect(cat).toBeInstanceOf(Object);
      expect(cat.createdAt).toBeInstanceOf(Date);
      expect(cat.updatedAt).toBeInstanceOf(Date);
      expect(cat.name).toBe(catResponseInstance[0].name);
    });
  });

  describe('create', () => {
    it('should create a cat', async () => {
      const cat = await catService.create(catResponseInstance[0]);
      expect(cat).toBeInstanceOf(Object);
      expect(cat.createdAt).toBeInstanceOf(Date);
      expect(cat.updatedAt).toBeInstanceOf(Date);
      expect(cat.name).toBe(catResponseInstance[0].name);
    });
  });

  describe('update', () => {
    it('should update a cat', async () => {
      const cat = await catService.update(
        catResponseInstance[0]._id,
        catResponseInstance[0],
      );
      expect(cat).toBeInstanceOf(Object);
      expect(cat.createdAt).toBeInstanceOf(Date);
      expect(cat.updatedAt).toBeInstanceOf(Date);
      expect(cat.name).toBe(catResponseInstance[0].name);
    });
  });

  describe('delete', () => {
    it('should delete a cat', async () => {
      const cat = await catService.delete(catResponseInstance[0]._id);
      expect(cat).toEqual(undefined);
    });
  });
});
