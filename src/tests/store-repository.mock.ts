import { getRepositoryToken } from "@nestjs/typeorm";
import { Store } from "../store/entities/store.entity";

export const storeRepositoryMock = {
  provide: getRepositoryToken(Store),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};
