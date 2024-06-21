import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderItemsService } from '../order-items/order-items.service';
import { orderRepositoryMock } from '../tests/order-repository.mock';
import { userRepositoryMock } from '../tests/user-repository.mock';
import { productRepositoryMock } from '../tests/product-repository.mock';
import { storeRepositoryMock } from '../tests/store-repository.mock';
import { orderItemRepositoryMock } from '../tests/order-item-repository.mock';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        OrderItemsService,
        storeRepositoryMock,
        orderRepositoryMock,
        orderItemRepositoryMock,
        userRepositoryMock,
        productRepositoryMock,
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
