import { StoreInfoDto } from 'src/store/dto/store-info.dto';

export class ProductResponseDto {
  id: number;
  name: string;
  price: number;
  store: StoreInfoDto;
}
