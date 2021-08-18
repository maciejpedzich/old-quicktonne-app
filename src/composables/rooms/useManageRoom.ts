import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';

import { User } from '@auth0/auth0-spa-js';
import { doc, getDoc, updateDoc } from '@firebase/firestore';

import db from '@/db';
import Room from '@/types/models/Room';

import useAuth0 from '../useAuth0';
import logErrorInDevMode from '@/utils/logErrorInDevMode';
import createFirestoreConverter from '@/utils/createFirestoreConverter';
import assignIdToDocData from '@/utils/assignIdToDocData';
import UseManageRoomReturn from '@/types/return/UseManageRoom';
import { deleteDoc, onSnapshot } from 'firebase/firestore';

export default function useManageRoom(roomId: string): UseManageRoomReturn {
  const router = useRouter();
  const toast = useToast();
  const { currentUser } = useAuth0();

  const isFetchingRoomData = ref(true);
  const room = ref<Room | null>(null);

  const roomDocRef = doc(db, 'rooms', roomId).withConverter(
    createFirestoreConverter<Room>()
  );

  let cancelRoomUpdatesSub: (() => void) | null = null;

  const setRoomMembers = async (guest: User | null, host: User | null) => {
    try {
      await updateDoc(roomDocRef, { guest, host });
    } catch (error) {
      logErrorInDevMode(error);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to update room members',
        life: 3000
      });
    }
  };

  const getRoom = async () => {
    try {
      const snapshot = await getDoc(roomDocRef);
      const roomData = assignIdToDocData<Room>(snapshot);

      if (!snapshot.exists() || !!roomData.guest) {
        throw new Error('ROOM_UNAVAILABLE');
      }

      cancelRoomUpdatesSub = onSnapshot(roomDocRef, (doc) => {
        const updatedRoomData = assignIdToDocData<Room>(doc);
        console.log(updatedRoomData);
        room.value = updatedRoomData;
      });

      currentUser.value?.email !== roomData.host?.email &&
        setRoomMembers(currentUser.value, roomData.host);

      room.value = roomData;
      isFetchingRoomData.value = false;
    } catch (error) {
      logErrorInDevMode(error);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail:
          error.message === 'ROOM_UNAVAILABLE'
            ? "This room is occupied or doesn't exist"
            : 'Failed to obtain room data',
        life: 3000
      });
      router.push('/rooms');
    }
  };

  const deleteRoom = async () => {
    try {
      await deleteDoc(roomDocRef);
    } catch (error) {
      logErrorInDevMode(error);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to delete room',
        life: 3000
      });
    }
  };

  return {
    isFetchingRoomData,
    room,
    getRoom,
    setRoomMembers,
    deleteRoom,
    cancelRoomUpdatesSub
  };
}
