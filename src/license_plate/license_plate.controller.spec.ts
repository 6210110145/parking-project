import { Test, TestingModule } from '@nestjs/testing';
import { LicensePlateController } from './license_plate.controller';

describe('LicensePlateController', () => {
  let controller: LicensePlateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LicensePlateController],
    }).compile();

    controller = module.get<LicensePlateController>(LicensePlateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
