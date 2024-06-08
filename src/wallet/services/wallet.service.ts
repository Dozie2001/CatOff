import { Injectable } from '@nestjs/common';
import { WalletEntity } from './models/wallet.entity';
import { User } from 'src/users/models/user.class';
import { UserEntity } from 'src/users/models/user.entity';
import { Wallet } from './models/wallet.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import cryptoRandomString from 'crypto-random-string';



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

    // Create wallet Address
    generateRandomWalletAddress() {
        return `0x${cryptoRandomString({length: 20, type: 'base64'})}`
    }
}
