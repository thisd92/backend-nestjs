import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create a new store' })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: Store,
  })
  create(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storeService.create(createStoreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stores' })
  @ApiOkResponse()
  findAll(): Promise<Store[]> {
    return this.storeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a store by id' })
  @ApiOkResponse()
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Store> {
    return this.storeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a store by ID' })
  @ApiResponse({
    status: 200,
    description: 'Store updated successfully',
    type: Store,
  })
  @ApiResponse({ status: 404, description: 'Store not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStoreDto: UpdateStoreDto,
  ): Promise<Store> {
    return this.storeService.update(id, updateStoreDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse({ description: 'Store not found' })
  @ApiOperation({ summary: 'Store deleted by ID' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.storeService.remove(id);
  }
}
