import { UseCase } from '@/core/base/use-case';
import { CreatedUserMapper } from '@/core/domain/mappers';
import { CreateUserMapper } from '@/core/domain/mappers/user/create-user.mapper';
import { UserRepository } from '@/core/repositories';
import { CreatedUserDto, CreateUserDto } from '@/shared/dtos/user';

export class CreateUserUseCase implements UseCase<CreatedUserDto> {
  private createUserMapper: CreateUserMapper;
  private createdUserMapper: CreatedUserMapper;

  constructor(private readonly repository: UserRepository) {
    this.createUserMapper = new CreateUserMapper();
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(user: CreateUserDto): Promise<CreatedUserDto> {
    const entity = this.createUserMapper.mapFrom(user);
    const createdUser = await this.repository.create(entity);
    return this.createdUserMapper.mapTo(createdUser);
  }
}
