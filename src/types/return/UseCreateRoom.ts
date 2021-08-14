import { Ref } from 'vue';

import Room from '../models/Room';

type UseCreateRoomReturn = {
  isLoading: Ref<boolean>;
  room: Room;
  createRoom(): void;
};

export default UseCreateRoomReturn;
