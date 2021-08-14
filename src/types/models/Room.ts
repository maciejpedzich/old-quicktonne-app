import { Timestamp } from 'firebase/firestore';
import { User } from '@auth0/auth0-spa-js';

type Room = {
  dateCreated?: Timestamp;
  language: string;
  creator: User;
  isOccupied: boolean;
};

export default Room;
