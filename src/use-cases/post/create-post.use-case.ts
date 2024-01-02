import { UseCase } from '@/core/base/use-case';
import { CreatePostMapper, CreatedPostMapper } from '@/core/domain/mappers';
import { PostRepository } from '@/core/repositories';
import { CreatePostDto, CreatedPostDto } from '@/shared/dtos/post';

export class CreatePostUseCase implements UseCase<CreatedPostDto> {
  private createPostMapper: CreatePostMapper;
  private createdPostMapper: CreatedPostMapper;

  constructor(private readonly repository: PostRepository) {
    this.createPostMapper = new CreatePostMapper();
    this.createdPostMapper = new CreatedPostMapper();
  }

  public async execute(post: CreatePostDto): Promise<CreatedPostDto> {
    const entity = this.createPostMapper.mapFrom(post);
    const createdPost = await this.repository.create(entity);
    return this.createdPostMapper.mapTo(createdPost);
  }
}
