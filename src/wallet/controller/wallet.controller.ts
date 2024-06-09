import { Body, Controller, Post, Get, Delete, Put, Param } from '@nestjs/common';
import { WalletService } from '../services/wallet.service';
import { Wallet } from '../services/models/wallet.interface';
import { User } from 'src/users/models/user.class';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
@Controller('wallet')
export class WalletController {

    constructor( private walletService: WalletService) {}

    @Post()
    async create(@Body() user: User, post: Wallet ): Promise<Observable<Wallet>>  {
        return this.walletService.createWallet(user, post);
    }

    @Get(':id')
    getWallet(@Param() user: User, ) {

    }

    @Put(':id')
    updateWallet(@Param() id: number, @Body() user: User, post: Wallet): Observable<UpdateResult> {
        return this.walletService.updateBalance(id, user, {balance: post.balance});
    }

    /**
     * 
     * @param id req.param.id
     * @returns deletes wallets
     */
    @Delete(':id')
    deleteWallet(@Param() id: number): Observable<DeleteResult>{
        return this.walletService.deleteWallet(id)
    }
}
