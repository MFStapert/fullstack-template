import { UserDto } from './user.dto';

export class PostDto {
  id: number;
  title: string;
  content?: string;
  published?: boolean;
  author?: UserDto;
}
