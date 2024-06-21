// utils/product-mapper.util.spec.ts
import { Product } from '../product/entities/product.entity';
import { mapToProductResponse } from './product-mapper.util';
import { StoreInfoDto } from 'src/store/dto/store-info.dto';

describe('mapToProductResponse', () => {
  it('should map product to ProductResponseDto correctly', () => {
    const store: StoreInfoDto = {
      name: 'Test Store',
      address: '123 Test St',
      addressNumber: 456,
      phone: '123-456-7890',
      city: 'Test City',
      state: 'Test State',
    };

    const product: Product = {
      id: 1,
      name: 'Test Product',
      price: 100,
      store: store,
    } as Product;
    const result = mapToProductResponse(product);

    expect(result).toBeDefined();
    expect(result.store.name).toBe(product.store.name);
    expect(result.store.address).toBe(product.store.address);
    expect(result.store.addressNumber).toBe(product.store.addressNumber);
    expect(result.store.phone).toBe(product.store.phone);
    expect(result.store.city).toBe(product.store.city);
    expect(result.store.state).toBe(product.store.state);
    expect(result.id).toBe(product.id);
    expect(result.name).toBe(product.name);
    expect(result.price).toBe(product.price);
  });
});
