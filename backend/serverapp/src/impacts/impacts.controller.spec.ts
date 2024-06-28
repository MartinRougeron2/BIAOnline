import { Test, TestingModule } from '@nestjs/testing';
import { ImpactsController } from './impacts.controller';
import { ImpactsService } from './impacts.service';

describe('ImpactsController', () => {
  let controller: ImpactsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImpactsController],
      providers: [ImpactsService],
    }).compile();

    controller = module.get<ImpactsController>(ImpactsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
