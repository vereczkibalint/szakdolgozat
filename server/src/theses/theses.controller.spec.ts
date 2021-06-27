import { Test, TestingModule } from '@nestjs/testing';
import { ThesesController } from './theses.controller';

describe('ThesesController', () => {
  let controller: ThesesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThesesController],
    }).compile();

    controller = module.get<ThesesController>(ThesesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
