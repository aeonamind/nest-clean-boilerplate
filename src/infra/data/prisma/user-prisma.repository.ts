import { Repository } from '@/core/base/repository';
import { UserEntity } from '@/core/domain/entities';

import { PrismaService } from './prisma.service';

export class UserPrismaRepository extends Repository<UserEntity> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: UserEntity): Promise<UserEntity> {
    return await this.prisma.user.create({ data });
  }

  async update(id: string, data: UserEntity): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async patch(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async getById(id: string): Promise<UserEntity> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.prisma.user.findMany();
  }

  async getOne(filter: Partial<UserEntity>): Promise<UserEntity> {
    return await this.getMany(filter).then((items) =>
      items.length > 0 ? items[0] : null,
    );
  }

  async getMany(filter: Partial<UserEntity>): Promise<UserEntity[]> {
    return await this.prisma.user.findMany({ where: filter });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
