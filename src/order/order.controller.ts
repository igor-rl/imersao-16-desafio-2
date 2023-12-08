import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() body: { asset_id: string; price: number; status?: string }) {
    if (body.status !== undefined) {
      throw new HttpException(
        'Status field is not allowed in the request.',
        HttpStatus.FORBIDDEN,
      );
    }
    return this.orderService.create({
      asset_id: body.asset_id,
      price: body.price,
    });
  }

  @Get()
  all() {
    return this.orderService.all();
  }
}
