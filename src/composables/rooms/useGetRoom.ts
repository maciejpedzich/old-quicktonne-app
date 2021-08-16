import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

import { doc, getDoc, updateDoc } from '@firebase/firestore';

import db from '@/db';
import Room from '@/types/models/Room';

import useAuth0 from '../useAuth0';

import logErrorInDevMode from '@/utils/logErrorInDevMode';
import createFirestoreConverter from '@/utils/createFirestoreConverter';
import assignIdToDocData from '@/utils/assignIdToDocData';
import UseGetRoomReturn from '@/types/return/UseGetRoom';

export default function useGetRoom(roomId: string): UseGetRoomReturn {
  const router = useRouter();
  const toast = useToast();
  const { currentUser } = useAuth0();

  const isFetchingRoomData = ref(true);
  const room = ref<Room | null>(null);

  const roomDocRef = doc(db, 'rooms', roomId).withConverter(
    createFirestoreConverter<Room>()
  );

  const setRoomIsOccupied = async (isOccupied: boolean) => {
    try {
      await updateDoc(roomDocRef, { isOccupied });
    } catch (error) {
      logErrorInDevMode(error);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update room status',
        life: 3000
      });
    }
  };

  const getRoom = async () => {
    try {
      const snapshot = await getDoc(roomDocRef);
      const roomData = assignIdToDocData<Room>(snapshot);

      if (!snapshot.exists() || roomData.isOccupied) {
        throw new Error('ROOM_UNAVAILABLE');
      }

      currentUser.value?.email !== roomData.creator.email &&
        setRoomIsOccupied(true);

      room.value = roomData;
      isFetchingRoomData.value = false;
    } catch (error) {
      logErrorInDevMode(error);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail:
          error.message === 'ROOM_UNAVAILABLE'
            ? "Room is occupied or doesn't exist"
            : 'Failed to obtain room data',
        life: 3000
      });
      router.push('/rooms');
    }
  };

  return { isFetchingRoomData, room, getRoom, setRoomIsOccupied };
}
