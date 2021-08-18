import { Ref } from 'vue';
import { User } from '@auth0/auth0-spa-js';

import Room from '../models/Room';

type UseManageRoomReturn = {
  isFetchingRoomData: Ref<boolean>;
  room: Ref<Room | null>;
  getRoom(): Promise<void>;
  setRoomMembers(guest: User | null, host: User | null): Promise<void>;
  deleteRoom(): Promise<void>;
  cancelRoomUpdatesSub: (() => void) | null;
};

export default UseManageRoomReturn;
