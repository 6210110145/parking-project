import { Test, TestingModule } from '@nestjs/testing';
import { LicensePlateService } from './license_plate.service';

describe('LicensePlateService', () => {
  let service: LicensePlateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LicensePlateService],
    }).compile();

    service = module.get<LicensePlateService>(LicensePlateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
