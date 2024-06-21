import { getRepositoryToken } from "@nestjs/typeorm";
import { Order } from "../order/entities/order.entity";

export const orderRepositoryMock = {
  provide: getRepositoryToken(Order),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
