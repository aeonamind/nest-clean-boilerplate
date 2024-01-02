import { Entity } from 'src/core/base/entity';

export class PostEntity extends Entity {
  title: string;
  content: string;
  userId: string;
}
