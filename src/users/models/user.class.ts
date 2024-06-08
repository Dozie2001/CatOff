import { IsEmail, IsString } from "@nestjs/class-validator";
import { Wallet } from "src/wallet/services/models/wallet.interface";

export class User {
  id?: number;
  firstName?: string;
  lastName?: string;
  @IsEmail()
  email?: string
  @IsString()
  password?: string;
  wallets: Wallet[]
}