import { Ref } from 'vue';
import Room from '../models/Room';

type UseGetRoomReturn = {
  isFetchingRoomData: Ref<boolean>;
  room: Ref<Room | null>;
  getRoom(): Promise<void>;
};

export default UseGetRoomReturn;
