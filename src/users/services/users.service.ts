import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../models/user.class';
import * as bcrypt from 'bcrypt';
import { Observable, from, of } from 'rxjs';
import { WalletEntity } from 'src/wallet/services/models/wallet.entity';

@Injectable()
export class UsersService {
    constructor (
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}


    findUserById(id: number): Observable<User> {
        return from(
          this.userRepository.findOne({
            where: { id },
            relations: ['wallets']
          }),
        ).pipe(
          map((user: User | null) => {
            if (!user) {
              throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }
            delete user.password;
            return user;
          }),
        );
    }

    updateUserWallets(id: number, wallet: WalletEntity): Observable<UpdateResult> {
        const user = new UserEntity();
        user.id = id;
        user.wallets.push(wallet)
        return from(this.userRepository.update(id, user));
    }
}
