import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  all() {
    return this.prismaService.order.findMany({
      include: { Assets: true },
    });
  }

  async create(data: { asset_id: string; price: number }) {
    const assetExists = await this.prismaService.asset.findUnique({
      where: { id: data.asset_id },
    });
    if (!assetExists) {
      throw new NotFoundException(`Asset with id ${data.asset_id} not found`);
    }
    return this.prismaService.order.create({
      data: {
        asset_id: data.asset_id,
        price: data.price,
        status: 'OPEN',
      },
    });
  }
}
