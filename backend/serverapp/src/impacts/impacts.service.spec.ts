import { Test, TestingModule } from '@nestjs/testing';
import { ImpactsService } from './impacts.service';

describe('ImpactsService', () => {
  let service: ImpactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImpactsService],
    }).compile();

    service = module.get<ImpactsService>(ImpactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
