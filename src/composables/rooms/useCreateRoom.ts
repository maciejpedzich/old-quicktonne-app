import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useToast } from 'primevue/usetoast';
import { User } from '@auth0/auth0-spa-js';
import { addDoc, collection, Timestamp } from '@firebase/firestore';

import useAuth0 from '@/composables/useAuth0';
import db from '@/db';
import logErrorInDevMode from '@/utils/logErrorInDevMode';
import createFirestoreConverter from '@/utils/createFirestoreConverter';
import Room from '@/types/models/Room';
import UseCreateRoomReturn from '@/types/return/UseCreateRoom';

export default function useCreateRoom(): UseCreateRoomReturn {
  const router = useRouter();
  const toast = useToast();
  const { currentUser } = useAuth0();

  const isLoading = ref(false);
  const room = reactive<Room>({
    language: '',
    host: currentUser.value as User,
    guest: null
  });

  const createRoom = async () => {
    try {
      isLoading.value = true;
      room.dateCreated = Timestamp.fromDate(new Date());

      const roomsCollection = collection(db, 'rooms').withConverter(
        createFirestoreConverter<Room>()
      );
      const roomDoc = await addDoc(roomsCollection, room);

      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Room created successfully',
        life: 3000
      });
      router.push(`/rooms/${roomDoc.id}`);
    } catch (error) {
      logErrorInDevMode(error);
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create a room',
        life: 3000
      });
    } finally {
      isLoading.value = false;
    }
  };

  return { isLoading, room, createRoom };
}
