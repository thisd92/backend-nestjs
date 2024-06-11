import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { PaymentMethodsService } from './payment-methods.service';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { PaymentMethod } from './entities/payment-method.entity';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('payment-methods')
export class PaymentMethodsController {
  constructor(private readonly paymentMethodsService: PaymentMethodsService) {}

  @Post(':userId')
  @ApiOperation({summary: 'Add Payment Method to User'})
  @ApiResponse({
    status: 201,
    description: 'Payment method created successfully',
    type: PaymentMethod,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid data provided' })
  create(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() createPaymentMethodDto: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.paymentMethodsService.create(userId, createPaymentMethodDto);
  }

  @Get()
  @ApiOperation({summary: 'Get all payment methods'})
  @ApiResponse({
    status: 200,
    description: 'Payment methods retrieved successfully',
    type: [PaymentMethod],
  })
  findAll() {
    return this.paymentMethodsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'Get payment method by id'})
  @ApiResponse({
    status: 200,
    description: 'Payment method retrieved successfully',
    type: PaymentMethod,
  })
  @ApiNotFoundResponse({ description: 'Payment method not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.paymentMethodsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({summary: 'Payment Methodo delete by id'})
  @ApiResponse({
    status: 200,
    description: 'Payment method deleted successfully',
  })
  @ApiNotFoundResponse({ description: 'Payment method not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.paymentMethodsService.remove(id);
  }
}
