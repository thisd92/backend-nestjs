import { getRepositoryToken } from "@nestjs/typeorm";
import { PaymentMethod } from "../payment-methods/entities/payment-method.entity";

export const paymentRepositoryMock = {
  provide: getRepositoryToken(PaymentMethod),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
