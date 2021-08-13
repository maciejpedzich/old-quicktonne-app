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

  const allLanguages = ref<{ label: string; value: string }[]>([
    { label: 'C (GCC 9.2.0)', value: 'c' },
    { label: 'C++ (GCC 9.2.0)', value: 'cpp' },
    { label: 'C# (Mono 6.6.0.161)', value: 'csharp' },
    { label: 'Clojure (1.10.1)', value: 'clojure' },
    { label: 'Go (1.13.5)', value: 'go' },
    { label: 'Groovy (3.0.3)', value: 'groovy' },
    { label: 'Java (OpenJDK 13.0.1)', value: 'java' },
    { label: 'JavaScript (Node.js 12.14.0)', value: 'javascript' },
    { label: 'Lua (5.3.5)', value: 'lua' },
    { label: 'Objective-C (Clang 7.0.1)', value: 'objective-c' },
    { label: 'Perl (5.28.1)', value: 'perl' },
    { label: 'Python (3.8.1)', value: 'python' },
    { label: 'Ruby (2.7.0)', value: 'ruby' },
    { label: 'Rust (1.40.0)', value: 'rust' },
    { label: 'Swift (5.2.3)', value: 'swift' },
    { label: 'TypeScript (3.7.4)', value: 'typescript' }
  ]);
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
    allLanguages,
    preferredLanguages,
    getAndSubToRoomUpdates,
    cancelRoomUpdatesSub
  };
}
