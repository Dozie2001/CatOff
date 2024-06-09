import { Injectable } from '@nestjs/common';
import { WalletEntity } from './models/wallet.entity';
import { User } from 'src/users/models/user.class';
import { UserEntity } from 'src/users/models/user.entity';
import { Wallet } from './models/wallet.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import * as crypto from 'crypto'



@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(WalletEntity)
        private readonly walletrepository: Repository<WalletEntity>
    ) {}

    createWallet(user: User, wallet: Wallet): Observable<Wallet> {
        wallet.author = user;
        wallet.address = this.generateRandomWalletAddress();
        return from(this.walletrepository.save(wallet));
    }

    // Retrieves all wallets related to a particylar user
    findAllwallets(): Observable<Wallet[]> {
        return from(
            this.walletrepository
                .createQueryBuilder('wallet')
                .innerJoinAndSelect('wallet.author', 'author')
                .getMany()
        )
    }

    /**
     * @param id req.param.id
     *  Return specified wallet
     */
    findPostById(id: number): Observable<Wallet> {
        return from(
          this.walletrepository.findOne({where: {
            id: id
          }, relations: {
            author: true
          } }),
        );
    }

    /**
     * 
     * @param id req.param.id 
     * @param user 
     * @param wallet 
     * @returns the updated Balance
     */
    updateBalance(id: number, user: User, wallet: Wallet): Observable<UpdateResult> {

        return from(
            this.walletrepository.update(id, {
                balance: wallet.balance
            }))
    }


    /** */
    deleteWallet(id: number): Observable<DeleteResult> {
        return from(this.walletrepository.delete(id));
    }

    // Create wallet Address
    generateRandomWalletAddress() {
        return `0x${crypto.randomBytes(32).toString('hex')}`
    }


}
