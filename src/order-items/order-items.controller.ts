import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsService: OrderItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all order items' })
  @ApiOkResponse()
  findAll(): Promise<OrderItem[]> {
    return this.orderItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order item by id' })
  @ApiOkResponse()
  findOne(@Param('id', ParseIntPipe) id: number): Promise<OrderItem> {
    return this.orderItemsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Order Item updated successfully',
    type: OrderItem,
  })
  @ApiResponse({ status: 404, description: 'Order Item not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    return this.orderItemsService.update(id, updateOrderItemDto);
  }

  @Delete(':id')
  @ApiOkResponse()
  @ApiOperation({ summary: 'Order Item deleted by ID' })
  @ApiNotFoundResponse({ description: 'Order Item not found' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.orderItemsService.remove(id);
  }
}
