import {
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from 'firebase/firestore';

export default function createFirestoreConverter<
  T
>(): FirestoreDataConverter<T> {
  return {
    toFirestore: (data: T) => data,
    fromFirestore: (snapshot: QueryDocumentSnapshot) => snapshot.data() as T
  };
}
