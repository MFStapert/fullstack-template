import { CreateMeetDto } from '../../src/meet/dto/create-meet.dto';

export const createMeetFactory = (createMeetDto?: Partial<CreateMeetDto>): CreateMeetDto => {
  return {
    title: createMeetDto?.title ?? 'new meet',
    createdBy: createMeetDto?.createdBy ?? 1,
    users: createMeetDto?.users ?? [1, 2],
  };
};
