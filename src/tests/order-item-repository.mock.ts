import { getRepositoryToken } from "@nestjs/typeorm";
import { OrderItem } from "../order-items/entities/order-item.entity";

export const orderItemRepositoryMock = {
  provide: getRepositoryToken(OrderItem),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
