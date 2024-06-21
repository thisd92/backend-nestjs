import { Test, TestingModule } from '@nestjs/testing';
import { StoreService } from './store.service';
import { storeRepositoryMock } from '../tests/store-repository.mock';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StoreService, storeRepositoryMock],
    }).compile();

    service = module.get<StoreService>(StoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
