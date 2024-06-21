import { getRepositoryToken } from "@nestjs/typeorm";
import { Product } from "../product/entities/product.entity";

export const productRepositoryMock = {
  provide: getRepositoryToken(Product),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
