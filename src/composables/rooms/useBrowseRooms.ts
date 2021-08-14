import { ref, watch } from 'vue';

import { useToast } from 'primevue/usetoast';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy
} from 'firebase/firestore';

import db from '@/db';
import Room from '@/types/models/Room';
import DocWithId from '@/types/models/DocWithId';
import LANGUAGES from '@/constants/LANGUAGES';

import logErrorInDevMode from '@/utils/logErrorInDevMode';
import createFirestoreConverter from '@/utils/createFirestoreConverter';
import assignIdToDocData from '@/utils/assignIdToDocData';

const roomsCollection = collection(db, 'rooms').withConverter(
  createFirestoreConverter<Room>()
);

export default function useBrowseRooms() {
  const toast = useToast();

  const isLoading = ref(true);
  const rooms = ref<DocWithId<Room>[]>([]);
  const preferredLanguages = ref<string[]>(['javascript']);

  let cancelRoomUpdatesSub: (() => void) | null = null;

  const getAndSubToRoomUpdates = () => {
    cancelRoomUpdatesSub && cancelRoomUpdatesSub();

    isLoading.value = true;
    rooms.value = [];

    const getRoomsQuery = query(
      roomsCollection,
      where('language', 'in', preferredLanguages.value),
      where('isOccupied', '==', false),
      orderBy('dateCreated')
    );

    cancelRoomUpdatesSub = onSnapshot(
      getRoomsQuery,
      (snapshot) => {
        rooms.value = snapshot.docs.map((doc) => assignIdToDocData<Room>(doc));
        isLoading.value = false;
      },
      (error) => {
        logErrorInDevMode(error);
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: "Failed to get rooms' data",
          life: 3000
        });
      }
    );
  };

  watch(
    preferredLanguages,
    (newPrefs) => newPrefs.length > 0 && getAndSubToRoomUpdates()
  );

  return {
    isLoading,
    rooms,
    LANGUAGES,
    preferredLanguages,
    getAndSubToRoomUpdates,
    cancelRoomUpdatesSub
  };
}
