import { User } from "src/users/models/user.class";


export interface Wallet {
  id?: number;
  address?: string;
  balance?: number
  author?: User;
}