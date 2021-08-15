import { DocumentSnapshot, QueryDocumentSnapshot } from 'firebase/firestore';
import DocWithId from '@/types/models/DocWithId';

export default function assignIdToDocData<T>(
  doc: QueryDocumentSnapshot<T> | DocumentSnapshot<T>
): DocWithId<T> {
  return Object.assign({ id: doc.id }, doc.data());
}
