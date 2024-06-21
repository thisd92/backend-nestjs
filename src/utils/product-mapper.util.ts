import { ProductResponseDto } from '../product/dto/product-response.dto';
import { Product } from '../product/entities/product.entity';
import { StoreInfoDto } from '../store/dto/store-info.dto';

export function mapToProductResponse(product: Product): ProductResponseDto {
  const storeInfo: StoreInfoDto = {
    name: product.store.name,
    address: product.store.address,
    addressNumber: product.store.addressNumber,
    phone: product.store.phone,
    city: product.store.city,
    state: product.store.state,
  };

  return {
    ...product,
    store: storeInfo,
  };
}
