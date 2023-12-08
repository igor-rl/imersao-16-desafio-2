import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma/prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prismaService: PrismaService) {}

  all() {
    return this.prismaService.asset.findMany();
  }

  async create(data: { id: string; symbol: string }) {
    const assetExists = await this.prismaService.asset.findUnique({
      where: { id: data.id },
    });
    if (assetExists) {
      throw new ForbiddenException(`Asset with id ${data.id} already exists`);
    }
    return await this.prismaService.asset.create({
      data,
    });
  }
}
