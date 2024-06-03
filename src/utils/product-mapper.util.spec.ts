import { Product } from 'src/product/entities/product.entity';
import { mapToProductResponse } from './product-mapper.util';

describe('mapToProductResponse', () => {
  it('should map product to ProductResponseDto correctly', () => {
    const product: Product = {} as Product;

    const result = mapToProductResponse(product);

    expect(result).toBeDefined();
    expect(result.store.name).toBe(product.store.name);
  });
});
