import { Ref } from 'vue';

import Language from '../models/Language';
import DocWithId from '../models/DocWithId';
import Room from '../models/Room';

type UseBrowseRoomsReturn = {
  isLoading: Ref<boolean>;
  LANGUAGES: Language[];
  rooms: Ref<DocWithId<Room>[]>;
  preferredLanguages: Ref<string[]>;
  getAndSubToRoomUpdates(): void;
  cancelRoomUpdatesSub: (() => void) | null;
};

export default UseBrowseRoomsReturn;
