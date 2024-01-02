import { Repository } from '@/core/base/repository';
import { PostEntity } from '@/core/domain/entities';

import { PrismaService } from './prisma.service';

export class PostPrismaRepository extends Repository<PostEntity> {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async create(data: PostEntity): Promise<PostEntity> {
    return this.prisma.post.create({ data });
  }

  async update(id: string, data: PostEntity): Promise<PostEntity> {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  patch(id: string, data: Partial<PostEntity>): Promise<PostEntity> {
    return this.prisma.post.update({
      where: { id },
      data,
    });
  }

  async getById(id: string): Promise<PostEntity> {
    return await this.prisma.post.findUnique({ where: { id } });
  }

  async getAll(): Promise<PostEntity[]> {
    return await this.prisma.post.findMany();
  }

  async getOne(filter: Partial<PostEntity>): Promise<PostEntity> {
    return await this.getMany(filter).then((items) =>
      items.length > 0 ? items[0] : null,
    );
  }

  async getMany(filter: Partial<PostEntity>): Promise<PostEntity[]> {
    return await this.prisma.post.findMany({ where: filter });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.post.delete({ where: { id } });
  }
}
