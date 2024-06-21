import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { orderRepositoryMock } from '../tests/order-repository.mock';
import { userRepositoryMock } from '../tests/user-repository.mock';
import { productRepositoryMock } from '../tests/product-repository.mock';
import { OrderItemsService } from '../order-items/order-items.service';
import { storeRepositoryMock } from '../tests/store-repository.mock';
import { orderItemRepositoryMock } from '../tests/order-item-repository.mock';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        OrderItemsService,
        orderRepositoryMock,
        orderItemRepositoryMock,
        userRepositoryMock,
        productRepositoryMock,
        storeRepositoryMock,
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
