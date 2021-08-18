import { Timestamp } from 'firebase/firestore';
import { User } from '@auth0/auth0-spa-js';

type Room = {
  dateCreated?: Timestamp;
  language: string;
  host: User | null;
  guest: User | null;
};

export default Room;
