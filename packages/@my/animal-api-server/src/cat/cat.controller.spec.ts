import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CatController } from './cat.controller';

describe('CatController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CatController],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const catController = app.get<CatController>(CatController);
      expect(catController.findAll()).toBe('Hello World!');
    });
  });
});
