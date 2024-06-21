import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { productRepositoryMock } from '../tests/product-repository.mock';
import { storeRepositoryMock } from '../tests/store-repository.mock';
import { FileService } from '../file/file.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, FileService, productRepositoryMock, storeRepositoryMock],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
