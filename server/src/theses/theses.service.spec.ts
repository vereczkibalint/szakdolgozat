import { Test, TestingModule } from '@nestjs/testing';
import { ThesesService } from './theses.service';

describe('ThesesService', () => {
  let service: ThesesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ThesesService],
    }).compile();

    service = module.get<ThesesService>(ThesesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
