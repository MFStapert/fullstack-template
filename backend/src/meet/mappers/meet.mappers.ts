import { CreateMeetDto } from '../dto/create-meet.dto';

export function toUserToMeet(meetId: number, createMeetDto: CreateMeetDto) {
  return createMeetDto.users.map(user => {
    return {
      meetId: meetId,
      userId: user,
    };
  });
}
